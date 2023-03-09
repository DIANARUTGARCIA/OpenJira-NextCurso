//Para llenar la bd de forma automatica
interface SeeData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeeData = {
  entries: [
    {
      description: 'Pendiente Lorem sdjdshkdshvfhdhvudihi',
      status: 'pending',
      createdAt: Date.now(),
    },
    {
      description: 'En progreso vIENNE sdjdshkdshvfhdhvudihi',
      status: 'i-progress',
      createdAt: Date.now() - 10000000,
    },
    {
      description: 'Terminadas COmkm sdjdshkdshvfhdhvudihi',
      status: 'finished',
      createdAt: Date.now() - 100000,
    },
  ]
}
