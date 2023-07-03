type CategoryEntity = {
  id?: number; // Category ID
  name: string; // Name of category
  description: string; // A brief description of the category
  icon: string;
  color: string;
  createdAt: Date;
};

const categoryEntity: CategoryEntity = {
  id: undefined,
  name: '',
  description: '',
  icon: '',
  color: '',
  createdAt: new Date()
};

export default categoryEntity;