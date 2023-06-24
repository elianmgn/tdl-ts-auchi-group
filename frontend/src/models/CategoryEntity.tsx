type CategoryEntity = {
  id?: number; // Category ID
  name: string;   // Name of category
  description: string; // A brief description of the category
  createdAt: Date;
};

const categoryEntity: CategoryEntity = {
  id: undefined,
  name: '',
  description: '',
  createdAt: new Date()
};

export default categoryEntity;