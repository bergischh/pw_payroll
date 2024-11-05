# Generated by Django 5.1 on 2024-11-03 10:04

import api.models.company_models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_kehadiran_is_approved_kehadiran_is_read'),
    ]

    operations = [
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('name_company', models.CharField(max_length=100)),
                ('description', models.CharField(max_length=100)),
                ('desc_emply', models.CharField(max_length=100)),
                ('image', models.ImageField(blank=True, null=True, upload_to=api.models.company_models.openrec_directory_path)),
            ],
        ),
    ]
