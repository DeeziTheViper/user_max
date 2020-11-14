from rest_framework.routers import DefaultRouter
from .views import *
from django.urls import path




router = DefaultRouter()
router.register('products', ProductViewSet, basename="products")
urlpatterns = router.urls