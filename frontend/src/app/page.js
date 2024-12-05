"use client";
import Image from "next/image";
import trifold from "/public/brochure.png";
import "./styles/homepage.css";
import { BiSolidUser } from "react-icons/bi";
import { BiBarChartAlt2 } from "react-icons/bi";
import { BiAward } from "react-icons/bi";
import { BsFileEarmark } from "react-icons/bs";
import { BiMenu } from "react-icons/bi";
import { useEffect, useState } from "react";
import htmlLogo from "/public/html.png";
import { BiSolidTrophy } from "react-icons/bi";
import { BiFile } from "react-icons/bi";
import { BiCheckCircle } from "react-icons/bi";
import { Doughnut, Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  annotationPlugin
);

export default function Home() {
  const [showNavList, setShowNavList] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [rank, setRank] = useState("");
  const [percentile, setPercentile] = useState("");
  const [score, setScore] = useState("");
  const [response, setResponse] = useState({
    rank: "5",
    score: "11",
    percentile: "35",
  });

  const doubtnutChartData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [response.score, 15 - response.score],
        backgroundColor: ["blue", "white"],
        borderWidth: 0,
      },
    ],
  };
  const options = {
    cutout: "70%",
  };

  const data = [
    {
      id: 1,
      subject: "HTML",
      subjectImg: null,
      rank: 5,
      score: 10,
      percentage: 30,
      syllabus: [
        {
          topic: ["References , tags"],
          currentStatus: 80,
        },
        {
          topic: ["Forms , History , HTML tools"],
          currentStatus: 90,
        },
        {
          topic: ["Tables, semantics , HTML5"],
          currentStatus: 70,
        },
        {
          topic: ["Dictionary,lists,others"],
          currentStatus: 50,
        },
      ],
    },
    {
      id: 2,
      subject: "CSS",
      subjectImg: null,
      rank: "8",
      score: "9",
      percentage: 40,
      syllabus: [
        {
          topic: ["selectors , styles "],
          currentStatus: 80,
        },
        {
          topic: ["inline styling"],
          currentStatus: 90,
        },
        {
          topic: ["animation"],
          currentStatus: 70,
        },
        {
          topic: ["pseudo -classes"],
          currentStatus: 50,
        },
      ],
    },
    {
      id: 3,
      subject: "Javascript",
      subjectImg: null,
      rank: "7",
      score: "11",
      percentage: 70,
      syllabus: [
        {
          topic: ["Loops", "data-types"],
          currentStatus: 40,
        },
        {
          topic: ["V8-engine", "ES-6"],
          currentStatus: 80,
        },
        {
          topic: ["Array-methods", "Object-literal", "OOPs"],
          currentStatus: 60,
        },
        {
          topic: ["Closure", "WebApis", "Async"],
          currentStatus: 20,
        },
      ],
    },
  ];
  function getUser() {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setResponse(JSON.parse(storedUser));
    }
    console.log(storedUser);
  }
  useEffect(() => {
    getUser();
  }, []);

  function updateScore() {
    if (rank.length > 0 && percentile.length > 0 && score.length > 0) {
      if (
        percentile < 100 &&
        percentile >= 0 &&
        score <= 15 &&
        score > 0 &&
        rank > 0
      ) {
        const updatedUser = {
          rank: rank,
          percentile: percentile,
          score: score,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setShowForm(!showForm);
        getUser();
      } else {
        prompt("Invalid Values. Please check your input");
      }
    } else {
      prompt("Please input all the values. Fields cannot be empty");
    }
    setRank("");
    setPercentile("");
    setScore("");
  }
  return (
    <div className="homepage">
      {showForm && (
        <div className="formContainer">
          <div className="form">
            <div className="title">Update Scores</div>
            <div className="updateFieds">
              <div className="field">
                Update Your
                <span
                  style={{
                    fontWeight: "500",
                    fontSize: "1rem",
                    color: "black",
                  }}
                >
                  {" "}
                  Rank
                </span>
              </div>
              <input
                type="number"
                value={rank}
                className="inputTag"
                onChange={(e) => setRank(e.target.value)}
              />
            </div>
            <div className="updateFieds">
              <div className="field">
                Update Your
                <span
                  style={{
                    fontWeight: "500",
                    fontSize: "1rem",
                    color: "black",
                  }}
                >
                  {" "}
                  Percentile
                </span>{" "}
              </div>
              <input
                type="number"
                value={percentile}
                className="inputTag"
                onChange={(e) => setPercentile(e.target.value)}
              />
            </div>
            <div className="updateFieds">
              <div className="field">
                Update Your
                <span
                  style={{
                    fontWeight: "500",
                    fontSize: "1rem",
                    color: "black",
                  }}
                >
                  {" "}
                  Score (out of 15)
                </span>
              </div>
              <input
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                className="inputTag"
              />
            </div>
            <div className="ctrlButtons">
              <button
                className="cancelBtn"
                onClick={() => {
                  setShowForm(!showForm);
                  setPercentile("")
                  setRank("")
                  setScore("")
                }}
              >
                Cancel
              </button>
              <button className="saveBtn" onClick={updateScore}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <nav className="navbar">
        <div className="companyInfo">
          <span className="logo">
            <Image src={trifold} alt="trifold icon" width={30} height={30} />
          </span>
          <span className="companyName"> WhatBytes </span>
        </div>
        <div className="profile">
          <span className="logo">
            <BiSolidUser style={{ width: "30px", height: "30px" }} />
          </span>
          <span className="user"> Divya </span>
        </div>
        <div
          className="hamburger"
          onClick={() => {
            setShowNavList(!showNavList);
          }}
        >
          <BiMenu style={{ width: "26px", height: "26px" }} />
        </div>
        <div
          style={showNavList ? { display: "flex" } : { display: "none" }}
          className="navList"
        >
          <div className="navListItem">Profile</div>
          <div className="navListItem">Dashboard</div>
          <div className="navListItem">Skills</div>
          <div className="navListItem">Internships</div>
        </div>
      </nav>
      <main className="mainPage">
        <VerticalNav />
        <div className="analysis">
          <div className="subjectWiseAnalysis">
            <div className="subject">
              <Image
                src={
                  data[0].subjectImg === null ? htmlLogo : data[0].subjectImg
                }
                alt={data[0].subject}
                className="subjectLogo"
              />
              <div className="subjectName">Hyper Text Markup Lang</div>
              <button
                onClick={() => {
                  setShowForm(true);
                }}
                className="update"
              >
                Update
              </button>
            </div>
            <div className="scoreCard">
              <div style={{ fontWeight: "500", marginLeft: "1rem" }}>
                Quick Statistics
              </div>
              <div className="scoreContainer">
                <ScoreList
                  Icon={BiSolidTrophy}
                  color={"gold"}
                  data={{
                    marks: response.rank,
                    field: "rank",
                  }}
                />
                <ScoreList
                  Icon={BiFile}
                  color={"blue"}
                  data={{
                    marks: response.percentile,
                    field: "percentage",
                  }}
                />
                <ScoreList
                  Icon={BiCheckCircle}
                  color={"green"}
                  data={{
                    marks: response.score,
                    field: "Score",
                  }}
                />
              </div>
            </div>
            <div className="analysisGraph">
              <LineChartWithVerticalLine
                verticalLinePosition={response.percentile}
              />
            </div>
          </div>
          <div className="topicWiseAnalysisAndComment">
            <div className="topicWiseAnalysis">
              <TopicAnalysis
                w={data[0].syllabus[0].currentStatus}
                topic={data[0].syllabus[0].topic}
              />
              <TopicAnalysis
                w={data[0].syllabus[1].currentStatus}
                topic={data[0].syllabus[1].topic}
              />
              <TopicAnalysis
                w={data[0].syllabus[2].currentStatus}
                topic={data[0].syllabus[2].topic}
              />
              <TopicAnalysis
                w={data[0].syllabus[3].currentStatus}
                topic={data[0].syllabus[3].topic}
              />
            </div>
            <div className="comment">
              <div className="data2">
                <span style={{ fontWeight: "500" }}>Question Analysis</span>{" "}
                <span>{data[0].score}</span>
              </div>
              <div style={{ fontSize: "0.8rem", fontWeight: "500" }}>
                <span
                  style={{
                    fontWeight: "500",
                    fontSize: "0.8rem",
                    color: "gray",
                  }}
                >
                  You have scored {response.score} out of 15.
                </span>{" "}
                However It still needs some improvement.
              </div>
              <div className="doubtnutChart">
                <Doughnut data={doubtnutChartData} options={options} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ScoreList(props) {
  const { Icon, color, data } = props;
  return (
    <div
      style={{
        width: "25%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "100%",
        gap: "0.5rem",
      }}
    >
      <div>
        <Icon style={{ color: `${color}`, width: "26px", height: "26px" }} />
      </div>
      <div>
        <div style={{ fontWeight: "500" }}>{data.marks}</div>
        <div style={{ fontSize: "0.8rem" }}>{data.field}</div>
      </div>
    </div>
  );
}
function VerticalNav() {
  return (
    <div className="verticalNavbar">
      <div className="navigation">
        <BiBarChartAlt2 style={{ width: "26px", height: "26px" }} />
        <span className="navTo">Dashboard</span>
      </div>
      <div className="navigation">
        <BiAward style={{ width: "26px", height: "26px" }} />
        <span className="navTo">Skills Test</span>
      </div>
      <div className="navigation">
        <BsFileEarmark style={{ width: "26px", height: "26px" }} />
        <span className="navTo">Internships</span>
      </div>
    </div>
  );
}
function TopicAnalysis(props) {
  const { w, topic } = props;
  return (
    <div className="topicCompletion">
      <div className="topics">{topic}</div>
      <div className="animation">
        <div
          style={{
            width: "100%",
            height: "0.4rem",
            backgroundColor: "rgb(177, 219, 177)",
            borderRadius: "0.5rem",
          }}
        >
          <div className="colorDiv" style={{ width: `${w}%` }}></div>{" "}
        </div>
      </div>
    </div>
  );
}
function LineChartWithVerticalLine({ verticalLinePosition }) {
  // Chart data
  const data = {
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    datasets: [
      {
        label: "Number of Students",
        data: [5, 10, 15, 7, 20, 30, 12, 8, 25, 18, 22], // Example data for each percentage
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.3)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        type: "linear",
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10, // Steps in multiples of 10
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      annotation: {
        annotations: [
          {
            type: "line",
            scaleID: "x",
            value: verticalLinePosition, // The x position for the vertical line
            borderColor: "red",
            borderWidth: 2,
            label: {
              content: `Line at ${verticalLinePosition}%`,
              enabled: true,
              position: "top",
            },
          },
        ],
      },
    },
  };

  return <Line data={data} options={options} />;
}
