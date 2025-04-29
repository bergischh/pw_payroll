from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import get_authorization_header
from rest_framework.exceptions import AuthenticationFailed
from django.shortcuts import get_object_or_404
from datetime import date

from ..models.soal_models import SoalWawancara, JawabanWawancara
from ..models.user_models import User
from ..models.karyawan_models import calonKaryawan
from ..serializers import SoalWawancaraSerializer, JawabanWawancaraSerializer
from ..authentication import decode_access_token

class SoalWawancaraView(APIView):
    # GET: Menampilkan semua soal wawancara
    def get(self, request):
        soal = SoalWawancara.objects.all()
        serializer = SoalWawancaraSerializer(soal, many=True)
        return Response(serializer.data)

    # POST: Menambahkan soal wawancara baru
    def post(self, request):
        serializer = SoalWawancaraSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SoalWawancaraDetailView(APIView):
    # GET: Mendapatkan detail soal wawancara tertentu
    def get(self, request, pk):
        soal = get_object_or_404(SoalWawancara, pk=pk)
        serializer = SoalWawancaraSerializer(soal)
        return Response(serializer.data)

    # PUT: Mengupdate soal wawancara
    def put(self, request, pk):
        soal = get_object_or_404(SoalWawancara, pk=pk)
        serializer = SoalWawancaraSerializer(soal, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE: Menghapus soal wawancara
    def delete(self, request, pk):
        soal = get_object_or_404(SoalWawancara, pk=pk)
        soal.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class JawabanWawancaraView(APIView):
    # GET: Menampilkan jawaban wawancara oleh calon karyawan
    def get(self, request):
        jawaban = JawabanWawancara.objects.all()
        serializer = JawabanWawancaraSerializer(jawaban, many=True)
        return Response(serializer.data)

    # POST: Calon karyawan menjawab soal wawancara
    def post(self, request):
        serializer = JawabanWawancaraSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class JawabanWawancaraDetailView(APIView):
    # GET: Mendapatkan detail jawaban wawancara tertentu
    def get(self, request, pk):
        jawaban = get_object_or_404(JawabanWawancara, pk=pk)
        serializer = JawabanWawancaraSerializer(jawaban)
        return Response(serializer.data)

    # PUT: Admin menilai jawaban calon karyawan
    def put(self, request, pk):
        jawaban = get_object_or_404(JawabanWawancara, pk=pk)
        serializer = JawabanWawancaraSerializer(jawaban, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE: Menghapus jawaban wawancara
    def delete(self, request, pk):
        jawaban = get_object_or_404(JawabanWawancara, pk=pk)
        jawaban.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)