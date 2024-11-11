import prisma from "../../lib/prisma/prisma";

export default async function handler(req, res) {
  const { studentId, classId } = req.query;

  if (req.method === "GET") {
    // Öğrencileri Getirme İşlemi
    try {
      let students;
      if (classId) {
        // Belirli bir sınıfa ait öğrencileri getir
        students = await prisma.student.findMany({
          where: { classId: classId },
        });
      } else {
        // classId yoksa tüm öğrencileri getir
        students = await prisma.student.findMany();
      }
      res.status(200).json(students);
    } catch (error) {
      console.error("Öğrenciler alınamadı:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }

  } else if (req.method === "POST") {
    // Yeni Öğrenci Oluşturma İşlemi
    const {
      name,
      surname,
      email,
      password,
      role = "student",
      verified = false,
      phone,
      city,
      town,
      schooltype,
      schollName,
      classNumber,
      classId,
    } = req.body;

    if (!name || !surname || !email || !classId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      const newStudent = await prisma.student.create({
        data: {
          name,
          surname,
          email,
          password,
          role,
          verified,
          phone,
          city,
          town,
          schooltype,
          schollName,
          classNumber,
          classId,
        },
      });
      res.status(201).json(newStudent);
    } catch (error) {
      console.error("Öğrenci eklenemedi:", error);
      res.status(500).json({ message: error.message });
    }

  } else if (req.method === "PUT") {
    // Öğrenci Güncelleme İşlemi
    const {
      name,
      surname,
      email,
      password,
      role,
      verified,
      phone,
      city,
      town,
      schooltype,
      schollName,
      classNumber,
      classId,
    } = req.body;

    if (!studentId) {
      return res.status(400).json({ message: "Missing studentId parameter" });
    }

    try {
      const updatedStudent = await prisma.student.update({
        where: { id: studentId },
        data: {
          name,
          surname,
          email,
          password,
          role,
          verified,
          phone,
          city,
          town,
          schooltype,
          schollName,
          classNumber,
          classId,
        },
      });
      res.status(200).json(updatedStudent);
    } catch (error) {
      console.error("Öğrenci güncellenemedi:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }

  } else if (req.method === "DELETE") {
    // Öğrenci Silme İşlemi
    if (!studentId) {
      return res.status(400).json({ message: "Missing studentId parameter" });
    }

    try {
      const existingStudent = await prisma.student.findUnique({
        where: { id: studentId },
      });

      if (!existingStudent) {
        return res.status(404).json({ error: "Student not found" });
      }

      await prisma.student.delete({
        where: { id: studentId },
      });
      res.status(204).end(); // Başarıyla silindiğinde 204 No Content döndürür
    } catch (error) {
      console.error("Öğrenci silinemedi:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }

  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
} 
