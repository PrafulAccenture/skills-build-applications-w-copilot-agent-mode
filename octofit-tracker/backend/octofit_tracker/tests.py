from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard

class BasicModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name='Test Team')
        self.assertEqual(str(team), 'Test Team')
    def test_create_user(self):
        team = Team.objects.create(name='Test Team')
        user = User.objects.create(name='Clark Kent', email='clark@dc.com', team=team, is_superhero=True)
        self.assertEqual(str(user), 'Clark Kent')
    def test_create_activity(self):
        team = Team.objects.create(name='Test Team')
        user = User.objects.create(name='Bruce Wayne', email='bruce@dc.com', team=team, is_superhero=True)
        activity = Activity.objects.create(user=user, type='Running', duration=30, date='2025-10-28')
        self.assertIn('Running', str(activity))
    def test_create_workout(self):
        workout = Workout.objects.create(name='Pushups', description='Upper body')
        self.assertEqual(str(workout), 'Pushups')
    def test_create_leaderboard(self):
        team = Team.objects.create(name='Test Team')
        user = User.objects.create(name='Diana Prince', email='diana@dc.com', team=team, is_superhero=True)
        leaderboard = Leaderboard.objects.create(team=team, user=user, score=100)
        self.assertIn('Diana Prince', str(leaderboard))
