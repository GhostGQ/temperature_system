import {
  Combobox,
  useCombobox,
  Input,
  Loader,
  Text,
  ScrollArea,
} from '@mantine/core';
import {useEffect, useRef, useState} from 'react';
import type {Trailer} from '../../shared/types/types';
import type {UseFormRegister} from 'react-hook-form';
import type {AlertPost} from '../../app/services/alertService';

interface Props {
  trailers: Trailer[];
  isLoading: boolean;
  search: string;
  setSearch: (value: string) => void;
  selectedId: number | null;
  setSelectedId: (value: number | null) => void;
  isSubmitted: boolean;
  register: UseFormRegister<AlertPost>;
}

const PAGE_SIZE = 20;

export default function TrailersSearchInput({
  trailers,
  isLoading,
  search,
  setSearch,
  selectedId,
  setSelectedId,
  isSubmitted,
  register,
}: Props) {
  const combobox = useCombobox();
  const [inputValue, setInputValue] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const optionsRef = useRef<HTMLDivElement>(null);

  const filteredTrailers = trailers?.filter(trailer =>
    trailer.name.toLowerCase().includes(search.toLowerCase())
  );

  const visibleTrailers = filteredTrailers?.slice(0, visibleCount);

  const handleScroll = () => {
    if (optionsRef.current) {
      const {scrollTop, scrollHeight, clientHeight} = optionsRef.current;
      const isNearBottom = scrollHeight - (scrollTop + clientHeight) < 50;

      if (isNearBottom && visibleCount < filteredTrailers.length) {
        setVisibleCount(prev => prev + PAGE_SIZE);
      }
    }
  };

  const handleOptionSubmit = (id: string) => {
    setSelectedId(Number(id));
    const selectedTrailer = trailers.find(t => t.id === Number(id));
    setInputValue(selectedTrailer?.name || '');
    combobox.closeDropdown();
  };

  useEffect(() => {
    if (selectedId) {
      const selectedTrailer = trailers.find(t => t.id === selectedId);
      setInputValue(selectedTrailer?.name || '');
    }
  }, [selectedId]);

  const options =
    visibleTrailers?.length > 0 && !isLoading
      ? visibleTrailers.map(trailer => (
          <Combobox.Option
            key={`${trailer.id}-${trailer.name}`}
            value={trailer.id.toString()}
          >
            {trailer.name}{' '}
            <Text size='xs' c='dimmed'>
              #{trailer.samsara_id}
            </Text>
          </Combobox.Option>
        ))
      : [];

  useEffect(() => {
    setVisibleCount(PAGE_SIZE); // сброс при новом поиске
  }, [search]);

  return (
    <Combobox
      position='bottom-start'
      withinPortal={false}
      store={combobox}
      onOptionSubmit={handleOptionSubmit}
    >
      <Combobox.Target>
        <Input
          {...register('trailer_id', {required: true})}
          error={isSubmitted && !selectedId ? 'Trailer is required' : undefined}
          placeholder='Search for trailer...'
          value={inputValue}
          onChange={event => {
            const value = event.currentTarget.value;
            setInputValue(value);
            setSearch(value);
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          rightSection={isLoading ? <Loader size='xs' /> : null}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <ScrollArea.Autosize
          mah={300}
          viewportRef={optionsRef}
          onScrollPositionChange={handleScroll}
        >
          <Combobox.Options>
            {isLoading ? (
              <Combobox.Empty>Загрузка...</Combobox.Empty>
            ) : options.length > 0 ? (
              options
            ) : (
              <Combobox.Empty>Ничего не найдено</Combobox.Empty>
            )}
          </Combobox.Options>
        </ScrollArea.Autosize>
      </Combobox.Dropdown>
    </Combobox>
  );
}
