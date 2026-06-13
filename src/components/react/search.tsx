import Fuse from 'fuse.js';
import { useState, useMemo, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import BlogCardJSX from './blog-card';
import debounce from 'lodash.debounce';
import { cn } from '@/lib/utils';
import type { CollectionEntry } from 'astro:content';

type SearchEntry = CollectionEntry<'blog'>;

interface SearchProps {
  searchList: SearchEntry[];
  initialPosts: SearchEntry[];
}

const options = {
  keys: ['data.title', 'data.description', 'data.tags'],
  includeMatches: true,
  minMatchCharLength: 3,
  threshold: 0.3,
  distance: 100,
  sortFn: (a: { score: number }, b: { score: number }) => a.score - b.score,
};

function Search({ searchList, initialPosts }: SearchProps) {
  const [query, setQuery] = useState('');
  const [filteredPosts, setFilteredPosts] =
    useState<SearchEntry[]>(initialPosts);

  const processedSearchList = useMemo(
    () =>
      searchList.map((item) => ({
        ...item,
        data: {
          ...item.data,
          title: String(item.data.title || '').toLowerCase(),
          description: String(item.data.description || '').toLowerCase(),
          tags: Array.isArray(item.data.tags)
            ? item.data.tags.map((tag) => String(tag).toLowerCase())
            : [],
        },
      })),
    [searchList],
  );

  const fuse = useMemo(
    () => new Fuse<SearchEntry>(processedSearchList, options),
    [processedSearchList],
  );

  const handleOnSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.length > 2) {
        const results = fuse
          .search(searchQuery.toLowerCase())
          .map((result) => result.item);
        setFilteredPosts(results);
      } else {
        setFilteredPosts(initialPosts);
      }
    }, 100),
    [fuse, initialPosts],
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);
    handleOnSearch(searchQuery);
  };

  return (
    <div>
      <div>
        <label
          htmlFor="search"
          className="text-foreground mb-2 block text-sm font-medium dark:text-white"
        >
          Search
        </label>
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          name="search"
          id="search"
          autoComplete="off"
          autoCorrect="off"
          placeholder="Search posts"
          className="w-full outline-none focus:ring-0 dark:bg-neutral-900 dark:text-white"
        />
      </div>

      <hr className="my-6 border-neutral-200 dark:border-neutral-700" />
      <div
        className={cn(
          'flex items-center justify-between',
          'mb-4',
          !query && 'hidden',
        )}
      >
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
          {filteredPosts.length} posts found
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Search results for: <strong>{query}</strong>
        </p>
      </div>

      <div className="mt-6">
        <ul className="flex flex-col gap-4">
          {filteredPosts.slice(0, 50).map((post) => (
            <li key={post.id}>
              <BlogCardJSX entry={post} />
            </li>
          ))}
        </ul>

        {filteredPosts.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-neutral-600 dark:text-neutral-400">
              No posts found matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
