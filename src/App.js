import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SearchInput from './component/common/SearchInput';
import Pagination from './component/common/Pagination';

import TestPage from "./component/common/TestPage";
import MobileBackend from './component/project/MobileBackend';
import Chameleon from './component/project/Chameleon';
import Delivery from "./component/project/Delivery";



// --------- 새로운 프로젝트를 추가합니다 ---------
const projects = [
  { name: "Chameleon", path: "/chameleon", component: Chameleon },
  { name: "Delivery", path: "/delivery", component: Delivery },
  { name: "Test3", path: "/test11", component: TestPage },
  { name: "Test4", path: "/test4", component: TestPage },
  { name: "Test5", path: "/test5", component: TestPage },
  { name: "Test6", path: "/test6", component: TestPage },
  { name: "Test7", path: "/test7", component: TestPage },
  { name: "Test8", path: "/test8", component: TestPage },
  { name: "Test9", path: "/test9", component: TestPage },
  { name: "Test10", path: "/test10", component: TestPage },
  { name: "Test11", path: "/test11", component: TestPage },
];





const ProjectList = () => {
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    setFilteredProjects(projects);
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(filtered);
    setCurrentPage(1);
  };

  const changePage = (direction) => {
    setCurrentPage(prevPage => prevPage + direction);
  };

  const start = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = filteredProjects.slice(start, start + itemsPerPage);

  return (
      <div className="top">
        <div className="container">
          <h1>API Documentation - 내부 공유용</h1>
          <SearchInput onSearch={handleSearch}/>

          <div className="project-list">
            {paginatedProjects.map((project, index) => (
                <Link to={project.path} key={index}
                      style={{textDecoration: 'none'}}>
                  <div className="project-item" style={{cursor: 'pointer'}}>
                    {project.name}
                  </div>
                </Link>
            ))}
          </div>

          <Pagination
              currentPage={currentPage}
              totalProjects={filteredProjects.length}
              itemsPerPage={itemsPerPage}
              onPageChange={changePage}
          />
        </div>
      </div>
  );
};

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<ProjectList/>}/>
          {projects.map((project, index) => (
              <Route
                  key={index}
                  path={project.path}
                  element={<project.component/>}
              />
          ))}
        </Routes>
      </Router>
  );
};

export default App;
