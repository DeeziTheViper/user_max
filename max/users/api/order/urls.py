from django.urls import path, re_path
from users.api.views import *

urlpatterns = [
    path('userorders', OrderListView.as_view()),
    path('usercompound-id/', Compoundn.as_view()),
    path('userwithdrawals/', WithdrawList.as_view()),
    path('userpayout-now/', Payout.as_view()),
    path('usercompounds', CompoundList.as_view()),
    path('userpost-order/', PostOrder.as_view()),
    path('userupdate-order/', UpdateOrder.as_view()),
    path('userdestroy-idOrder/', destroyOrder.as_view()),
    path('userstatus', StatusListView.as_view()),
    path('userdata', ChartView.as_view()),
    path('userhistory', UserHistory.as_view()),
    path('usercompleted-kits', CompletedKit.as_view())
]