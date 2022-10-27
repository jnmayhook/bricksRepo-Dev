import React, { useState } from 'react';
import SetSearchResults from './SetSearchResults';
import { useLazyQuery } from '@apollo/client';
import { GET_SET } from '../utils/queries';
import API from '../utils/API.js'

API.getBrickSet().then(data => {
  console.log(data)
})
const SetSearchForm = () => {
  const [searchInput, setSearchInput] = useState("")
  const [getSet, { loading, data, error }] = useLazyQuery(GET_SET)
const [list, setList] = useState([])
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    API.getBrickSet(searchInput).then(async results => {
      console.log(results)
      setList(results)
      if (!searchInput) {
        return false;
      }
      console.log(searchInput)  //correct
      const set = data?.set || []
      try {
        await getSet({
          variables: { Name: searchInput }
        });
      } catch (err) {
        console.error(err);
      }
    })
  };
  // console.log(set)
  // setSearchInput("")
  console.log(data)

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <div className="form-row">
          <div className="col-md-8 col-12">
            <input
              name="searchInput"
              placeholder="Search for a set"
              type="text"
              className="form-control form-control-lg"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <div class="col-md-4 col-12">
            <button type="submit" className="btn btn-blue mt-3">
              Submit Search
            </button>
          </div>
        </div>
      </form>
      <div className='container mb-5 mb-153'>
        <div className="row d-flex">
          <SetSearchResults
            set={data?.set}
            list={list}
          />
        </div>
      </div>
    </>
  );
};

export default SetSearchForm;
