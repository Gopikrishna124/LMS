import React, { useEffect, useState } from "react";
import StudentHeader from "@/componentpages/StudentComponents/header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { filterOptions, sortOptions } from "@/config";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchStudentViewAllCoursesListService } from "@/Api/studentCourses";
import { keepAllStudentCourses } from "@/redux/Student/CourseSlice";

function StudentViewExploreCoursesPage() {
  const dispatch = useDispatch();

  const studentViewAllCourses = useSelector(
    (state) => state.StudentCourse.AllCourses
  );
  const [studentFilterCourses, setStudentFilterCourses] = useState(
    studentViewAllCourses
  );

  const [sort, setSort] = useState("price-lowtohigh");
  console.log("sort", sort);

  const [filters, setFilters] = useState({});

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const studentCourses = useSelector(
    (state) => state.StudentCourse?.StudentBoughtCoures?.Courses
  );

  const [purchased, setPurchased] = useState([]);
  console.log("purchased");
  //...............................................................

  const createUrlSearch = (filterParams) => {
    const queryParams = [];
    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramsValue = value.join(",");

        queryParams.push(`${key}=${encodeURIComponent(paramsValue)}`);
        console.log("queryParams", queryParams);
      }
    }

    return queryParams.join("&");
  };

  ////////////////////////////////////////////////////////////////////////////////

  function handleFilterChange(keyItem, id) {
    console.log("keyItem", keyItem);
    let copyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(copyFilters).indexOf(keyItem);
    console.log("index", indexOfCurrentSection);
    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [keyItem]: [id],
      };
    } else {
      const indexOfCurrentOption = copyFilters[keyItem].indexOf(id);
      console.log("indexOption", indexOfCurrentOption);
      if (indexOfCurrentOption === -1) {
        copyFilters[keyItem].push(id);
      } else {
        copyFilters[keyItem].splice(indexOfCurrentOption, 1);
      }
    }
    console.log("copyFilters", copyFilters);
    setFilters(copyFilters);
    sessionStorage.setItem('filters',JSON.stringify(copyFilters))
    console.log("filters", filters);
  }

  // ...................................................
  useEffect(() => {
    const builderQueryStrings = createUrlSearch(filters);
    setSearchParams(new URLSearchParams(builderQueryStrings));
  }, [filters]);
  //..................................................

  useEffect(() => {
    const getAllStudentsCourses = async () => {
      try {
        const query = new URLSearchParams({
          ...filters,
          sortBy: sort,
        });
        console.log("query", query);
        const response = await fetchStudentViewAllCoursesListService(query);
        // console.log('studentCourses',response)
        if (response.data.success) {
          dispatch(setStudentFilterCourses(response.data.data));
          dispatch(keepAllStudentCourses(response.data.data));
        }
      } catch (error) {
        console.log("err", error);
      }
    };
    if ((filters !== null) & (sort !== null)) {
      getAllStudentsCourses();
    }
  }, [filters, sort]);

  //check purchased course
  const checkPurchasedCourses = (id) => {
    return (
      studentCourses &&
      studentCourses.find((item) => {
        if (item.courseId == id) {
          return true;
        } else {
          return false;
        }
      })
    );
    //  console.log(`payed${id}`,payed)
  };


  //..........................................
  useEffect(()=>{
   setSort('price-lowtohigh')
   setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
  },[])

  //.........................
  useEffect(()=>{
   return()=>{
    sessionStorage.removeItem('filters')
   }
  },[])

 
  return (
    <div>
      <StudentHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">All Courses</h1>
        <div className="flex flex-col md:flex-row gap-4 ">
          <aside className="w-full md:w-64 space-y-4">
            <div className="space-y-4">
              {Object.keys(filterOptions).map((keyItem) => (
                <div className="p-4 border-b">
                  <h3 className="font-bold">{keyItem.toUpperCase()}</h3>
                  <div className="grid gap-2 mt-1">
                    {filterOptions[keyItem].map((item) => {
                      return (
                        <Label className="flex font-medium items-center gap-3">
                          <Checkbox
                            checked={
                              filters &&
                              Object.keys(filters).length > 0 &&
                              filters[keyItem] &&
                              filters[keyItem].indexOf(item.id) > -1
                            }
                            onCheckedChange={() =>
                              handleFilterChange(keyItem, item.id)
                            }
                          />
                          {item.label}
                        </Label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex justify-end items-center mb-4 gap-5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 p-5"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span className="text-[16px] font-medium">Sort By</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={(value) => setSort(value)}
                  >
                    {sortOptions.map((item) => (
                      <DropdownMenuRadioItem value={item.id} key={item.id}>
                        {item.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <span className="text-sm text-red-600 font-bold">
                {studentFilterCourses.length} Results
              </span>
            </div>
            <div className="space-y-4">
              {studentFilterCourses && studentFilterCourses.length > 0 ? (
                studentFilterCourses.map((course) => (
                  <Card
                    onClick={() =>
                      navigate(`/student/course-details/${course?._id}`)
                    }
                    key={course?._id}
                    className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:-translate-y-1"
                  >
                    <CardContent className="flex gap-4 p-4">
                      <div className="w-52 h-40 flex-shrink-0">
                        <img
                          src={course?.images}
                          className="w-full h-full object-cover"
                          alt="course image"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-xl mb-2 ">
                            {course?.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mb-1">
                            Created By{" "}
                            <span className="font-bold text-green-600">
                              {course.instructorName}
                            </span>
                          </p>
                        </div>

                        <p className="text-[14px]  text-gray-500 mt-1 mb-2">
                          {`${course?.curriculum?.length} ${
                            course?.curriculum?.length <= 1
                              ? "Lecture"
                              : "Lectures"
                          }`}{" "}
                          -
                          <span className="">
                            {`${course?.level?.toUpperCase()} LEVEL`}{" "}
                          </span>
                        </p>
                        <p className="text-lg">
                          <span className="text-green-600 font-bold">$</span>
                          {course?.pricing}
                        </p>
                        {
                         
                          checkPurchasedCourses(course._id) ? (
                            <p className="min-w-[90px] float-end cursor-none md:mt-6 text-center text-white p-1 bg-green-400 text-[11px] rounded-sm"> 
                              Purchased
                            </p>
                          ) : (
                            <p className="bg-red-500 min-w-[90px] cursor-none  md:mt-6 float-end text-center text-white p-1 rounded-sm text-[11px]  ">
                              Not Purchased
                            </p>
                          )
                        }
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-4xl font-extrabold">No Courses Found</p>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default StudentViewExploreCoursesPage;
