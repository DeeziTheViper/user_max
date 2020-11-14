from django.contrib import admin
from .models import *
from django.contrib import messages 

class UserAdmin(admin.ModelAdmin): 
    search_fields = ('username', )
    list_display = ('username', 'active','account_balance', 'date_joined') 
  
    def active(self, obj): 
        return obj.is_active == 1

    def make_active(modeladmin, request, queryset): 
        queryset.update(is_active = 1) 
        messages.success(request, "Selected Record(s) Marked as Active Successfully !!") 
  
    def make_inactive(modeladmin, request, queryset): 
        queryset.update(is_active = 0) 
        messages.success(request, "Selected Record(s) Marked as Inactive Successfully !!") 
  
    make_active.short_description = "Make user active"
    make_inactive.short_description = "Make user inactive" 
  
    def has_delete_permission(self, request, obj = None): 
        return False    
  
    active.boolean = True

    actions = [make_active,make_inactive]

class StatAdmin(admin.ModelAdmin):
    search_fields = ('user', )
    list_display = ('user','storage','allStorage','referral_earning')


class OrderAdmin(admin.ModelAdmin):
    
    list_display = ('customer','product','amount','status','date_ordered','expires','txid')   
    def make_active(modeladmin, request, queryset): 
        queryset.update(status = 'Approved') 
        messages.success(request, "Selected Record(s) Marked as Approved Successfully !!")  

    def make_inactive(modeladmin, request, queryset): 
        queryset.update(status = 'Pending') 
        messages.success(request, "Selected Record(s) Marked as Pending Successfully !!")    

    make_active.short_description = "Approve Order"
    make_inactive.short_description = "Revert to Pending" 
    actions = [make_active,make_inactive]

class WithdrawAdmin(admin.ModelAdmin):
    
    list_display = ('user','amount','status','date_ordered')   
    def make_active(modeladmin, request, queryset): 
        queryset.update(status = 'Approved') 
        messages.success(request, "Selected Record(s) Marked as Approved Successfully !!")  

    def make_inactive(modeladmin, request, queryset): 
        queryset.update(status = 'Pending') 
        messages.success(request, "Selected Record(s) Marked as Pending Successfully !!")    

    make_active.short_description = "Approve Withdrawal"
    make_inactive.short_description = "Revert to Pending" 
    actions = [make_active,make_inactive]

class CompoundAdmin(admin.ModelAdmin):
    
    list_display = ('user','active','amount','date_requested')   
    def make_active(modeladmin, request, queryset): 
        queryset.update(active = 1) 
        messages.success(request, "Selected Record(s) Marked as Active Successfully !!")  

    def make_inactive(modeladmin, request, queryset): 
        queryset.update(active = 0) 
        messages.success(request, "Selected Record(s) Marked as Inactive Successfully !!")    

    make_active.short_description = "Activate Compounding"
    make_inactive.short_description = "Deactivate Compounding" 
    actions = [make_active,make_inactive]


admin.site.site_header = 'administration'
admin.site.site_title = 'Admin'
# Register your models here.
admin.site.register(User,UserAdmin) 
admin.site.register(Product)
admin.site.register(Order,OrderAdmin)
admin.site.register(Stat,StatAdmin)
admin.site.register(Profile)
admin.site.register(CompletedKit)
admin.site.register(Withdraw,WithdrawAdmin)
admin.site.register(Compound,CompoundAdmin)