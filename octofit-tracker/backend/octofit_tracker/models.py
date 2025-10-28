from django.db import models
try:
    from djongo.models import ObjectIdField
except ImportError:
    ObjectIdField = None

class Team(models.Model):
    id = ObjectIdField(primary_key=True, editable=False, db_column='_id') if ObjectIdField else models.CharField(primary_key=True, max_length=24, editable=False)
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    def __str__(self):
        return self.name

class User(models.Model):
    id = ObjectIdField(primary_key=True, editable=False) if ObjectIdField else models.CharField(primary_key=True, max_length=24, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    team = models.ForeignKey(Team, on_delete=models.SET_NULL, null=True, related_name='members')
    is_superhero = models.BooleanField(default=False)
    def __str__(self):
        return self.name

class Activity(models.Model):
    id = ObjectIdField(primary_key=True, editable=False) if ObjectIdField else models.CharField(primary_key=True, max_length=24, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    type = models.CharField(max_length=100)
    duration = models.PositiveIntegerField(help_text='Duration in minutes')
    date = models.DateField()
    def __str__(self):
        return f"{self.user.name} - {self.type} on {self.date}"

class Workout(models.Model):
    id = ObjectIdField(primary_key=True, editable=False) if ObjectIdField else models.CharField(primary_key=True, max_length=24, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    suggested_for = models.ManyToManyField(User, blank=True, related_name='suggested_workouts')
    def __str__(self):
        return self.name

class Leaderboard(models.Model):
    id = ObjectIdField(primary_key=True, editable=False) if ObjectIdField else models.CharField(primary_key=True, max_length=24, editable=False)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='leaderboards')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leaderboards')
    score = models.IntegerField(default=0)
    def __str__(self):
        return f"{self.user.name} ({self.team.name}): {self.score}"
