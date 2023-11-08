import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { Calendar } from "./Calendar";
import { Modal } from "./Modal";

export const CalendarController = () => {
  const [events, setEvents] = useState([]);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [selectedCommit, setSelectedCommit] = useState(null);
  const [commitsCache, setCommitsCache] = useState({});
  const { search } = useLocation();
  let navigate = useNavigate();
  const month = new URLSearchParams(search).get("m");
  const year = new URLSearchParams(search).get("y");

  const today = moment();
  const [currentMonthMoment, setCurrentMonthMoment] = useState(
    month && year ? moment(`${year}-${month}`, "YYYY-MM") : today
  );

  const fetchCommits = useCallback(
    async (monthMoment) => {
      const monthKey = monthMoment.format("YYYY-MM");
      if (commitsCache[monthKey]) {
        return commitsCache[monthKey];
      }

      const since = monthMoment.startOf("month").toISOString();
      const until = monthMoment.endOf("month").toISOString();
      let allCommits = [];
      let page = 1;
      let hasMore = true;

      try {
        while (hasMore) {
          const response = await fetch(
            `https://api.github.com/repos/huggingface/transformers/commits?since=${since}&until=${until}&per_page=100&page=${page}`,
            {
              headers: {
                Authorization: `Bearer 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`,
              },
            }
          );

          if (!response.ok) {
            console.error("Fetch error:", response.statusText);
            break;
          }

          const commits = await response.json();

          if (!Array.isArray(commits)) {
            console.error("Response is not an array:", commits);
            break;
          }

          allCommits = allCommits.concat(commits);
          page++;
          hasMore = commits.length === 100;
        }

        const processedCommits = allCommits.map((commit) => ({
          fullMessage: commit.commit.message,
          name: commit.commit.message.slice(0, 14),
          date: moment(commit.commit.author.date).startOf("day"),
          time: moment(commit.commit.author.date).format("HH:mm"),
          author: commit.author.login ? commit.author.login : "Unknown",
        }));

        setCommitsCache((prevCache) => ({
          ...prevCache,
          [monthKey]: processedCommits,
        }));
        return processedCommits;
      } catch (error) {
        console.error("Fetch failed:", error);
        return [];
      }
    },
    [commitsCache]
  );

  const fetchAndSetCommitsForMonth = useCallback(
    async (monthMoment) => {
      const commits = await fetchCommits(monthMoment);
      if (monthMoment.isSame(currentMonthMoment, "month")) {
        setEvents(commits);
      }
    },
    [fetchCommits, currentMonthMoment]
  );

  useEffect(() => {
    const monthsToFetch = [
      currentMonthMoment,
      currentMonthMoment.clone().subtract(1, "months"),
      currentMonthMoment.clone().subtract(2, "months"),
      currentMonthMoment.clone().subtract(3, "months"),
      currentMonthMoment.clone().add(1, "months"),
      currentMonthMoment.clone().add(2, "months"),
      currentMonthMoment.clone().add(3, "months"),
    ];

    monthsToFetch.forEach((month) => {
      fetchAndSetCommitsForMonth(month);
    });
  }, [currentMonthMoment, fetchAndSetCommitsForMonth]);

  const incrementMonth = () => {
    const newMonth = currentMonthMoment.clone().add(1, "months");
    navigate(`/${newMonth.format("YYYY-MM")}`);
    setCurrentMonthMoment(newMonth);
  };

  const decrementMonth = () => {
    const newMonth = currentMonthMoment.clone().subtract(1, "months");
    navigate(`/${newMonth.format("YYYY-MM")}`);
    setCurrentMonthMoment(newMonth);
  };

  const displayModal = (commit) => {
    setSelectedCommit(commit);
    setShowNewEventModal(true);
  };

  useEffect(() => {
    const path = window.location.pathname;
    const match = path.match(/\/(\d{4})-(\d{2})/);
    if (match) {
      const [, year, month] = match;
      setCurrentMonthMoment(moment(`${year}-${month}`, "YYYY-MM"));
    }
  }, [search]);

  return (
    <>
      <Modal
        shouldShow={showNewEventModal}
        onRequestClose={() => {
          setShowNewEventModal(false);
          setSelectedCommit(null);
        }}
      >
        {selectedCommit && (
          <>
            <h3>Commit Details</h3>
            <p>
              <strong>Message:</strong> {selectedCommit.fullMessage}
            </p>
            <p>
              <strong>Date:</strong> {selectedCommit.date.format("DD.MM.YYYY")}
            </p>
            <p>
              <strong>Time:</strong> {selectedCommit.time}
            </p>
            <p>
              <strong>Author:</strong> {selectedCommit.author}
            </p>
          </>
        )}
      </Modal>

      <Calendar
        getCellProps={(dayMoment) => {
          const eventForDay = events.find((event) => {
            return dayMoment && event.date.isSame(dayMoment, "day");
          });
          return { events: eventForDay ? [eventForDay] : [] };
        }}
        onCellClicked={(date, month, year) => {
          const clickedDate = moment(`${year}-${month}-${date}`, "YYYY-MM-DD");
          const commitForDay = events.find((event) =>
            event.date.isSame(clickedDate, "day")
          );
          if (commitForDay) {
            displayModal(commitForDay);
          }
        }}
        month={currentMonthMoment.format("MM")}
        year={currentMonthMoment.format("YYYY")}
        onPrev={decrementMonth}
        onNext={incrementMonth}
      />
    </>
  );
};
