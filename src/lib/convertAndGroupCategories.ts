export interface Category {
  id: number;
  name: string;
}

export interface GroupedCategory {
  group: string;
  categories: Category[];
}

export default function convertAndGroupCategories(
  categories: Category[],
): GroupedCategory[] {
  const groupedCategories: { [key: string]: Category[] } = {};

  categories.forEach((category) => {
    const firstLetter = category.name.charAt(0).toUpperCase();
    if (!groupedCategories[firstLetter]) {
      groupedCategories[firstLetter] = [];
    }
    groupedCategories[firstLetter].push(category);
  });

  const result: GroupedCategory[] = Object.keys(groupedCategories)
    .sort()
    .map((group) => ({
      group,
      categories: groupedCategories[group].sort((a, b) =>
        a.name.localeCompare(b.name),
      ),
    }));

  return result;
}
