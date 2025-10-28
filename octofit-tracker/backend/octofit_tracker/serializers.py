
from rest_framework import serializers
from .models import User, Team, Activity, Workout, Leaderboard

try:
    from bson.objectid import ObjectId
except Exception:
    ObjectId = None


class CustomModelSerializer(serializers.ModelSerializer):
    """ModelSerializer that converts any ObjectId values to strings in the
    final representation so JSON serialization doesn't fail with
    "ObjectId is not JSON serializable".
    """
    def to_representation(self, instance):
        data = super().to_representation(instance)

        def convert(obj, key_hint=None):
            # Recursively walk and convert ObjectId -> str and normalize id-like
            # values to strings for consistency (fields named 'id', ending with
            # '_id', or common relation names).
            if isinstance(obj, dict):
                for k, v in list(obj.items()):
                    obj[k] = convert(v, key_hint=k)
                return obj
            if isinstance(obj, list):
                return [convert(v, key_hint=key_hint) for v in obj]
            # bson ObjectId -> str
            if ObjectId is not None and isinstance(obj, ObjectId):
                return str(obj)
            # Normalize id-like values to string for consistency
            if key_hint and (key_hint == 'id' or key_hint.endswith('_id') or key_hint in ('team', 'user')):
                return str(obj)
            return obj

        return convert(data)


class TeamSerializer(CustomModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'


class UserSerializer(CustomModelSerializer):
    team = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = User
        fields = '__all__'


class ActivitySerializer(CustomModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Activity
        fields = '__all__'


class WorkoutSerializer(CustomModelSerializer):
    suggested_for = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Workout
        fields = '__all__'


class LeaderboardSerializer(CustomModelSerializer):
    team = serializers.PrimaryKeyRelatedField(read_only=True)
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Leaderboard
        fields = '__all__'
