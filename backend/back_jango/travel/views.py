from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import viewsets, status
from rest_framework.views import APIView
from travel.serializers import TravelSerializer
from travel.models import Travel, UserData, Like
from django.db.models import F

class TravelAPI(viewsets.ModelViewSet):
    queryset = Travel.objects.all()
    serializer_class = TravelSerializer

    def list(self, request):
        queryset = Travel.objects.all()
        serializer = TravelSerializer(queryset, many=True)
        print("Success")
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        user_name = request.data.get('name')  
        if not user_name:
            return Response({"error": "User not provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        user = get_object_or_404(UserData, name=user_name)
        
        serializer = TravelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(name=user)
            print("Success")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("Fail")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['POST'])
    def like(self, request, pk=None):
        travel = self.get_object()
        user_name = request.data.get('name')
        
        # 이미 좋아요 눌렀는지 확인
        existing_like = Like.objects.filter(name__name=user_name, post=travel)
        if existing_like.exists():
            return Response({"message": "You have already liked this post."}, status=status.HTTP_400_BAD_REQUEST)
        
        # 좋아요 추가
        user, _ = UserData.objects.get_or_create(name=user_name)
        Like.objects.create(name=user, post=travel)
        
        return Response({"message": "Post liked successfully."}, status=status.HTTP_201_CREATED)
        
### 로그인 ###
class LoginAPI(APIView):
    def post(self, request, *args, **kwargs):
        name = request.data.get('name')  # request
        pwd = request.data.get('password')
        
        try:
            user = UserData.objects.get(name=name)
        except UserData.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

        if pwd != user.password:
            return Response({"error": "Incorrect password."}, status=status.HTTP_400_BAD_REQUEST)

        # 로그인 성공 시
        response_data = {
            "message": "Login successful.",
            "user": {
                "name": user.name
            }
        }

        request.session['user'] = user.name

        return Response(response_data, status=status.HTTP_200_OK)
