# Generated by Django 5.1 on 2024-09-27 13:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_karyawan'),
    ]

    operations = [
        migrations.AddField(
            model_name='karyawan',
            name='jenis_kelamin',
            field=models.CharField(choices=[('laki_laki', 'Laki Laki'), ('perempuan', 'Perempuan')], default=None, max_length=10),
        ),
        migrations.AlterField(
            model_name='karyawan',
            name='status',
            field=models.CharField(choices=[('kawin', 'Kawin'), ('belum_kawin', 'Belum Kawin')], default=None, max_length=50),
        ),
    ]
