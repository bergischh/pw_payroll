# Generated by Django 5.1 on 2025-01-16 02:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='calonkaryawan',
            name='deskripsi',
            field=models.CharField(default='Tidak ada deskripsi', max_length=180),
        ),
    ]