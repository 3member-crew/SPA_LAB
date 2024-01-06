# Generated by Django 5.0 on 2024-01-06 11:17 
 
from django.db import migrations, models 
 
 
class Migration(migrations.Migration): 
 
    initial = True 
 
    dependencies = [ 
    ] 
 
    operations = [ 
        migrations.CreateModel( 
            name='Member', 
            fields=[ 
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')), 
            ], 
        ), 
        migrations.CreateModel( 
            name='Messages', 
            fields=[ 
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')), 
                ('message', models.CharField(max_length=100)), 
                ('timestamp', models.DateTimeField(auto_now_add=True)), 
            ], 
            options={ 
                'ordering': ['-timestamp'], 
            }, 
        ), 
        migrations.CreateModel( 
            name='Room', 
            fields=[ 
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')), 
                ('name', models.CharField(max_length=100)), 
                ('created_at', models.DateTimeField(auto_now_add=True)), 
                ('password', models.CharField(blank=True, max_length=100, null=True)), 
            ], 
        ), 
        migrations.CreateModel( 
            name='Video', 
            fields=[ 
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')), 
                ('video_url', models.URLField()), 
                ('added_at', models.DateTimeField(auto_now_add=True)), 
            ], 
            options={ 
                'ordering': ['-added_at'], 
            }, 
        ), 
    ]