import prisma from "../../lib/prisma/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // Sınıfları getirme işlemi
    const classes = await prisma.class.findMany({
      include: {
        students: true,
      }, 
    });
    res.status(200).json(classes);
  } else if (req.method === "POST") {
    // Yeni sınıf oluşturma işlemi
    const { name, grade, section } = req.body;
    try {
      const newClass = await prisma.class.create({
        data: {
          name,
          grade: parseInt(grade, 10), // grade alanını Int türüne dönüştür
          section,
          students: { connect: [] },
        },
      });
      res.status(201).json(newClass);
    } catch (error) {
      console.error("Error creating class:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "PUT") {
    // Sınıf güncelleme işlemi
    const { classId } = req.query; // Güncellenecek sınıfın ID'sini al
    const { name, grade, section } = req.body;

    try {
      const updatedClass = await prisma.class.update({
        where: { id: classId },
        data: {
          name,
          grade: parseInt(grade, 10), // grade alanını Int türüne dönüştür
          section,
        },
      });
      res.status(200).json(updatedClass);
    } catch (error) {
      console.error("Error updating class:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "DELETE") {
    // Sınıf silme işlemi
    const { classId } = req.query;

    try {
      const existingClass = await prisma.class.findUnique({
        where: { id: classId },
      });

      if (!existingClass) {
        return res.status(404).json({ error: 'Class not found' });
      }

      await prisma.class.delete({
        where: { id: classId },
      });

      res.status(204).end();
    } catch (error) {
      console.error('Error deleting class:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
