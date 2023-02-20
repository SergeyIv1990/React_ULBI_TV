import React from 'react';
import MySelect from './UI/select/MySelect';
import MyInput from './UI/input/MyInput';

const PostFilter = ({filter, setFilter}) => {
    return (
        <div>
        <MyInput
            value={filter.query}
            onChange = {e => setFilter({...filter, query: e.target.value})}
            placeholder="Поиск..."
        />
      <hr style={{margin: '15px 0'}}/>
      <MySelect
          value={filter.sort}
          onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
          defaultValue="Сортировка"
          options={[
            {value:'title', name:'по названию'},
            {value:'body', name:'по описанию'},
          ]}
      />
    </div>
    );
};

export default PostFilter;




