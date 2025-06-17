# from rest_framework import viewsets, status
# from rest_framework.response import Response
# from .models import Todo
# from .serializers import TodoSerializer
# import logging

# logger = logging.getLogger(__name__)

# class TodoViewSet(viewsets.ModelViewSet):
#     queryset = Todo.objects.all()
#     serializer_class = TodoSerializer
    
#     def create(self, request, *args, **kwargs):  #POST request
#         logger.info(f"Creating todo with data: {request.data}")
#         serializer = self.get_serializer(data=request.data)   #initialize with incoming datat
#         if serializer.is_valid():
#             todo = serializer.save()    #Save todo 
#             logger.info(f"Todo created successfully: {todo}")
#             return Response(serializer.data, status=status.HTTP_201_CREATED)    # send response
#         else:
#             logger.error(f"Validation errors: {serializer.errors}")
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   #send error response
    
#     def update(self, request, *args, **kwargs):   #PUT/POST request
#         logger.info(f"Updating todo {kwargs.get('pk')} with data: {request.data}")
#         partial = kwargs.pop('partial', False)
#         instance = self.get_object()
#         serializer = self.get_serializer(instance, data=request.data, partial=partial)
#         if serializer.is_valid():
#             todo = serializer.save()
#             logger.info(f"Todo updated successfully: {todo}")
#             return Response(serializer.data)
#         else:
#             logger.error(f"Validation errors: {serializer.errors}")
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#     def destroy(self, request, *args, **kwargs):    #DELETE REQUEST
#         logger.info(f"Deleting todo {kwargs.get('pk')}")
#         instance = self.get_object()   #find the id of todo
#         self.perform_destroy(instance)  #delete it
#         logger.info("Todo deleted successfully")
#         return Response(status=status.HTTP_204_NO_CONTENT)  #send response


from rest_framework import viewsets
from .models import Todo
from .serializers import TodoSerializer

class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
