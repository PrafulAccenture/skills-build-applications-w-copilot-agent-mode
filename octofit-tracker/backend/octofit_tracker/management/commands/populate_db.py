from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        self.stdout.write(self.style.WARNING('WARNING: This command does NOT delete old data.'))
        self.stdout.write(self.style.WARNING('Before running this command, drop the collections in MongoDB using:'))
        self.stdout.write(self.style.WARNING(
            "mongosh --eval 'use octofit_db; db.users.drop(); db.teams.drop(); db.activities.drop(); db.leaderboards.drop(); db.workouts.drop();'"
        ))

        self.stdout.write(self.style.SUCCESS('Creating teams...'))
        marvel = Team.objects.create(name='Team Marvel', description='Marvel superheroes')
        dc = Team.objects.create(name='Team DC', description='DC superheroes')

        self.stdout.write(self.style.SUCCESS('Creating users...'))
        users = [
            User.objects.create(name='Tony Stark', email='tony@marvel.com', team=marvel, is_superhero=True),
            User.objects.create(name='Steve Rogers', email='steve@marvel.com', team=marvel, is_superhero=True),
            User.objects.create(name='Bruce Wayne', email='bruce@dc.com', team=dc, is_superhero=True),
            User.objects.create(name='Clark Kent', email='clark@dc.com', team=dc, is_superhero=True),
        ]

        self.stdout.write(self.style.SUCCESS('Creating activities...'))
        Activity.objects.create(user=users[0], type='Iron Man Suit Training', duration=60, date=timezone.now().date())
        Activity.objects.create(user=users[1], type='Shield Throwing', duration=45, date=timezone.now().date())
        Activity.objects.create(user=users[2], type='Detective Work', duration=120, date=timezone.now().date())
        Activity.objects.create(user=users[3], type='Flight', duration=30, date=timezone.now().date())

        self.stdout.write(self.style.SUCCESS('Creating workouts...'))
        w1 = Workout.objects.create(name='Super Strength', description='Strength training for superheroes')
        w2 = Workout.objects.create(name='Agility', description='Agility and reflex training')
        w1.suggested_for.set(users)
        w2.suggested_for.set(users)

        self.stdout.write(self.style.SUCCESS('Creating leaderboard...'))
        Leaderboard.objects.create(team=marvel, user=users[0], score=100)
        Leaderboard.objects.create(team=marvel, user=users[1], score=90)
        Leaderboard.objects.create(team=dc, user=users[2], score=95)
        Leaderboard.objects.create(team=dc, user=users[3], score=98)

        self.stdout.write(self.style.SUCCESS('Database populated with test data!'))
