
from rest_framework import viewsets
from rest_framework.generics import ListAPIView, CreateAPIView, GenericAPIView
from rest_framework.mixins import UpdateModelMixin, DestroyModelMixin
from rest_framework.response import Response
from rest_framework.mixins import CreateModelMixin
from users.models import *
from users.models import CompletedKit as kitmodel
from .serializers import *
from users.serializers import *
import datetime
from dateutil.relativedelta import relativedelta
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.authentication import TokenAuthentication
class OrderListView(ListAPIView):
    authentication_classes = [TokenAuthentication,]
    serializer_class = OrderSerializer 
    
    
    def get_queryset(self):
        queryset = Order.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(customer__username=username)
        return queryset

class CompoundList(ListAPIView):
    authentication_classes = [TokenAuthentication,]
    serializer_class = CompoundSerializer

    def get_queryset(self):
        queryset = Compound.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(user__username=username)
        return queryset

class Compoundn(GenericAPIView, CreateModelMixin):
    authentication_classes = [TokenAuthentication,]
    serializer_class = CompoundSerializer
    queryset = Compound.objects.all()

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class WithdrawList(ListAPIView):
    authentication_classes = [TokenAuthentication,]
    serializer_class = WithdrawSerializer

    def get_queryset(self):
        queryset = Withdraw.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(user__username=username)
        return queryset        

class Payout(GenericAPIView, CreateModelMixin):
    authentication_classes = [TokenAuthentication,]
    serializer_class = PayOutSerializer
    queryset = Withdraw.objects.all()

    def post(self, request, *args, **kwargs):
        
        return self.create(request, *args, **kwargs)        



        
class PostOrder(GenericAPIView, CreateModelMixin):
    authentication_classes = [TokenAuthentication,]
    serializer_class = PostOrderSerializer
    queryset = Order.objects.all()

    def post(self, request, *args, **kwargs):
          
          return self.create(request, *args, **kwargs)    

class UpdateOrder(GenericAPIView, UpdateModelMixin):
    authentication_classes = [TokenAuthentication,]
    serializer_class = UpdateOrderSerializer
    queryset = Order.objects.all()
    def update(self, request, *args, **kwargs):
        txid = request.query_params.get('txid',None)
        partial = kwargs.pop('partial', False)
        instance = self.queryset.filter(txid=txid).last()
        serializer = self.get_serializer(instance,data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        if instance:
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)



    def put(self, request, *args, **kwargs):
          
          return self.partial_update(request, *args, **kwargs) 



class destroyOrder(GenericAPIView, DestroyModelMixin):
    authentication_classes = [TokenAuthentication,]
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def destroy(self, request, *args, **kwargs):
        txid = request.query_params.get('id')
        instance = self.queryset.filter(id=txid).first()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def post(self, request, *args,**kwargs):
        return self.destroy(request, *args, **kwargs)

        
class ProductViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny,]
    serializer_class = ProductSerializer
    queryset = Product.objects.all()    

class StatusListView(ListAPIView):
    authentication_classes = [TokenAuthentication,]
    serializer_class = StatusSerializer
    

    def get_queryset(self):
        username = self.request.query_params.get('username', None)

        queryset = Stat.objects.filter(user__username=username)
        return queryset          

    

class ChartView(ListAPIView):
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication,]
    def get_queryset(self):
        queryset = User.objects.all()
        username = self.request.query_params.get('username', None)
        
        if username is not None:
            queryset = queryset.filter(username=username)
            user = User.objects.get(username=username) 
            date = user.orders.date.all()
            print(date)
            """
            now = datetime.datetime.now()
            result = [now.strftime("%B")]
            for _ in range(0, 6):
                now = now.replace(day=1) + relativedelta(months=1) #- datetime.timedelta(days=1)
                result.append(now.strftime("%B"))
            print(result)
            """
class UserHistory(ListAPIView):
    serializer_class =  HistorySerializer
    authentication_classes = [TokenAuthentication,]
    
    def get_queryset(self):
        queryset = Stat.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(user__username=username)
            
            
        return queryset

class CompletedKit(ListAPIView):
    serializer_class = KitSerializer
    authentication_classes = [TokenAuthentication,]
    

    def get_queryset(self):
        queryset = kitmodel.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(user__username=username)

        return queryset
