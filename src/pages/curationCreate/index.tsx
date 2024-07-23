import { LocationSearch } from '@/_components/LocationSearch';
export const CurationCreate = () => {
  return (
    <main className="relative">
      <LocationSearch
        onSelectLocation={(locations) => console.log(locations)}
      />
    </main>
  );
};
