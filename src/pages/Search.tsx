import SearchComponent from '@/components/Search/index';
import SEO from '@/components/ui/SEO';
import { seo } from '@/constants';
const Search = () => {
  return (
    <>
      <SEO title={seo.searchResults.title} description={seo.searchResults.description} />
      <SearchComponent />
    </>
  );
};

export default Search;
