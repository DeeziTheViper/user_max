import string
import random
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from allauth.account.signals import user_signed_up
from datetime import timedelta
from dateutil.relativedelta import relativedelta
from datetime import datetime
from simple_history.models import HistoricalRecords
from django.dispatch import receiver
from pinax.referrals.models import Referral
from mptt.models import (
    MPTTModel,
    TreeForeignKey

)
from django.urls import reverse_lazy



# Create your models here.

class User(AbstractUser):
    first_name = models.CharField(max_length=300,blank=True, null=True)
    last_name  = models.CharField(max_length=300,blank=True, null=True)
    address = models.CharField(max_length=300,blank=True, null=True)
    city = models.CharField(max_length=200,blank=True, null=True)
    country = models.CharField(max_length=200,blank=True, null=True)
    zip_code =models.IntegerField(blank=True, null=True)
    is_student = models.BooleanField(default=False)
    btc_wallet = models.CharField(max_length=300)
    date_joined = models.DateTimeField(auto_now_add=True)
    urlhash = models.CharField(max_length=14, null=True, blank=True, unique=True)
    account_balance = models.DecimalField(max_digits=15, decimal_places=0, default=0,)
    active_affiliates = models.CharField(max_length=200, default=0)
    active_package = models.CharField(max_length=300,blank=True, null=True)
    email_verified = models.BooleanField(default=False)
    compounding = models.BooleanField(default=False)
    totalWithdrawn = models.DecimalField(max_digits=15,decimal_places=2, default=0)
    
    
    def __str__(self):
        return self.username

    def monthjoined(self):
        return self.date_joined.strftime('%Y')
    
   
    def id_generator(size=14, chars=string.ascii_uppercase + string.digits):
        return ''.join(random.choice(chars) for _ in range(size))

    def save(self,*args, **kwargs):
        if not self.urlhash:
            # Generate ID once, then check the db. If exists, keep trying.
            self.urlhash = User.id_generator()
            while User.objects.filter(urlhash=self.urlhash).exists():
                self.urlhash = User.id_generator()
        super().save(*args, **kwargs)



class Profile(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        verbose_name='user',
        related_name="profile"
    )
    referral = models.OneToOneField(
        Referral,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        verbose_name='referral',
    )
    referredBy = models.ForeignKey(User, related_name='referredBy', on_delete=models.CASCADE, blank=True, null=True)
   



    def __str__(self):
        return self.user.username





class Compound(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    active = models.BooleanField(default=False)
    duration = models.IntegerField(default=6)
    amount = models.DecimalField(max_digits=15,decimal_places=2)
    date_requested =  models.DateTimeField(auto_now_add=True, null=True)

    def save(self, *args, **kwargs):
        u = self.user
        u.compounding = True
        u.save()
        super().save(*args, **kwargs) 


        
class Withdraw(models.Model):
    STATUS = (
        ('Pending', 'Pending'),
        ('Approved', 'Approved')
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=15,decimal_places=2)
    status = models.CharField(max_length=200, choices=STATUS)
    date_ordered = models.DateTimeField(auto_now_add=True, verbose_name="Date Requested")
    date_approved = models.DateTimeField(auto_now=True)
    
    
    def __str__(self):
        return self.user.username


    
    def save(self, *args, **kwargs):
        if self.status == "Approved":
            u = self.user
            u.totalWithdrawn += self.amount
            u.save()
        super().save(*args, **kwargs)     
        
    
class Product(models.Model):
    STATUS = (
        ('Pending', 'Pending'),
        ('Active', 'Active'),
        ('Completed', 'Completed')
    )
    user = models.ForeignKey(User, related_name="plans",on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=200, blank=False)
    Price = models.FloatField(max_length=200)
    Description = models.TextField(blank=True, null=True)
    ROI = models.CharField(max_length=50, blank=False)
    Duration = models.IntegerField(default=0)
    status = models.CharField(max_length=200, choices=STATUS)
    
    def __str__(self):
        return self.name



class Order(models.Model):
    STATUS = (
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
    )
    customer = models.ForeignKey(User, related_name='orders',on_delete=models.SET_NULL, null=True)
    product = models.ForeignKey(Product,related_name='orders', on_delete=models.SET_NULL,null=True)
    status = models.CharField(max_length=200, choices=STATUS)
    amount = models.DecimalField(max_digits=15, decimal_places=2,default=0.00)
    date_ordered = models.DateTimeField(auto_now_add=True)
    expires = datetime.today()+ relativedelta(months=12)
    txid = models.CharField(max_length=300, blank=True, null=True)


    
    def __str__(self):
        return self.customer


    def save(self,*args, **kwargs):

        if  self.status == "Approved":
            try:
                print(self.amount)
                acc = self.customer
                print(acc)
                acc.account_balance += self.amount
                acc.save()
            except Exception as e:
                print (e)
        super().save(*args, **kwargs)
        

class CompletedKit(models.Model):
    user = models.ForeignKey(User, related_name="completed_kits", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, related_name="completed_kits", on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=15, decimal_places=2,default=0.00)
    
    history = HistoricalRecords()


    def __str__(self):
        return self.product.name



class Stat(models.Model):
    STATUS = (
        ('ROI', 'Profit Earning'),
        ('Refferal', 'Refferal Earning'),
    )
    user = models.ForeignKey(User, related_name="stats", on_delete=models.CASCADE)
    newprofit = models.DecimalField(max_digits=15, decimal_places=0, default=0)
    storage = models.DecimalField(max_digits=15, decimal_places=0, default=0,verbose_name="ROI")
    allStorage = models.DecimalField(max_digits=15, decimal_places=0, default=0,verbose_name="Total Earning")
    referral_earning = models.DecimalField(max_digits=15, decimal_places=2, default=0,verbose_name="Affiliate Earning")
    new_refEarning = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    changeReason = models.CharField(max_length=100, choices=STATUS, default="ROI")
    history = HistoricalRecords()
    

    
    def __str__(self):
        return self.user.username

    def save(self,*args, **kwargs):
        self.storage += self.newprofit 
        self.allStorage += self.newprofit + self.new_refEarning
        self.referral_earning += self.new_refEarning
        self.newprofit = 0
        self.new_refEarning =  0
        
        super().save(*args, **kwargs)    

    

    

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()
    


@receiver(user_signed_up)
def handle_user_signed_up(sender, request, user, **kwargs):
    profile = user.profile
    referral = Referral.create(user=user, redirect_to=reverse_lazy('rest_register'))
    profile.referral = referral
    action = Referral.record_response(request, "USER_SIGNUP")
    if action is not None:
            referra = Referral.objects.get(id=action.referral.id)
            print(referra.user.id)
            profile.referredBy = User.objects.get(id=referra.user.id)
            profile.save()
    profile.save()        