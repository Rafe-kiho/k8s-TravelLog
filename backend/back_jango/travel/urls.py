from django.urls import path,include

from .views import TravelAPI, LoginAPI # views파일에 있는 파일의 정보를 가져온다.
from rest_framework import routers
from rest_framework.routers import DefaultRouter

#travel_router = routers.DefaultRouter()
#travel_router.register(r'api', TravelAPI, basename="cafe_post")
router = DefaultRouter()
router.register(r'travel', TravelAPI)

urlpatterns = [
    #path('', include(travel_router.urls)),
    path('', TravelAPI.as_view({'get': 'list', 'post': 'create'}), name='travel-list-create'),
    path('<int:pk>/like/', TravelAPI.as_view({'post': 'like'}), name='travel-like'),
    path('login/', LoginAPI.as_view(), name='login'),
]

urlpatterns += router.urls