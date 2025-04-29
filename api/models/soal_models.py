# interview/models.py
from django.db import models


class SoalWawancara(models.Model):
    pertanyaan = models.CharField(max_length=255)
    baik = models.BooleanField(default=False)
    cukup = models.BooleanField(default=False)
    kurang = models.BooleanField(default=False)

    def __str__(self):
        return self.pertanyaan
    
class JawabanWawancara(models.Model):
    soal = models.ForeignKey(SoalWawancara, on_delete=models.CASCADE, related_name='jawaban')
    calon_karyawan = models.ForeignKey('calonKaryawan', on_delete=models.CASCADE, related_name='jawaban')
    jawaban = models.TextField()
    penilaian = models.CharField(max_length=20, choices=[('baik', 'Baik'), ('cukup', 'Cukup'), ('kurang', 'Kurang')], null=True, blank=True)
    tanggal_jawab = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Jawaban dari {self.calon_karyawan} untuk {self.soal}"

