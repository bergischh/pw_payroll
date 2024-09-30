# Generated by Django 5.1 on 2024-09-29 04:12

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_rename_tenggat_pinjam_pinjaman_tenggat_pinjaman'),
    ]

    operations = [
        migrations.CreateModel(
            name='PeriodeGaji',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('status_periode', models.CharField(choices=[('active', 'Active'), ('non_active', 'Non Active')], default=None, max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Kehadiran',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('tanggal', models.DateField()),
                ('informasi_kehadiran', models.CharField(max_length=100)),
                ('jam_masuk', models.TimeField()),
                ('jam_pulang', models.TimeField()),
                ('total_jam_kerja', models.TimeField()),
                ('keterangan_kehadiran', models.CharField(choices=[('sakit', 'Sakit'), ('izin', 'izin'), ('alpha', 'Alpha')], default=None, max_length=50)),
                ('total_jam_lembur', models.TimeField()),
                ('biaya_pengobatan', models.DecimalField(decimal_places=2, max_digits=12)),
                ('karyawan', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='kehadirankaryawan', to='api.karyawan')),
            ],
        ),
        migrations.CreateModel(
            name='LaporanGaji',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('tanggal_gaji', models.DateField()),
                ('gaji_mentah', models.DecimalField(decimal_places=2, max_digits=12)),
                ('gaji_total', models.DecimalField(decimal_places=2, max_digits=12)),
                ('jumlah_izin', models.IntegerField()),
                ('jumlah_sakit', models.IntegerField()),
                ('pinjaman', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='laporanpenggajian', to='api.pinjaman')),
                ('tunjangan', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='laporanpenggajian', to='api.tunjangan')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='laporanpenggajian', to=settings.AUTH_USER_MODEL)),
                ('periodegaji', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='laporanpenggajian', to='api.periodegaji')),
            ],
        ),
        migrations.CreateModel(
            name='SlipGaji',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('terima_dari', models.CharField(max_length=100)),
                ('nominal_gaji', models.DecimalField(decimal_places=2, max_digits=12)),
                ('untuk_pembayaran', models.CharField(max_length=100)),
                ('Laporan_penggajian', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='slipgaji', to='api.laporangaji')),
                ('karyawan', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='slipgaji', to='api.karyawan')),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('tanggal_pembayaran', models.DateField()),
                ('jumlah_pembayaran', models.DecimalField(decimal_places=2, max_digits=12)),
                ('pinjaman_karyawan', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='transaksipembayaran', to='api.pinjaman')),
            ],
        ),
    ]
