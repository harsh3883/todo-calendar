from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'
        
    def validate(self, data):
        """
        Check that timeEnd is after timeStart
        """
        if 'timeStart' in data and 'timeEnd' in data:
            if data['timeEnd'] <= data['timeStart']:
                raise serializers.ValidationError("End time must be after start time.")
        return data