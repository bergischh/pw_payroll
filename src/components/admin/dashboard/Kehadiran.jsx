import PropTypes from "prop-types";
import { format, addDays, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay } from "date-fns";
import { Icon } from "@iconify/react/dist/iconify.js";

const Calendar = ({ month, year, attendances }) => {
  const startDate = startOfWeek(startOfMonth(new Date(year, month - 1)));
  const endDate = endOfWeek(endOfMonth(new Date(year, month - 1)));

  const dateFormat = "d";
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";

  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, dateFormat);
      const cloneDay = day;

      const attendance = attendances.find(a =>
        isSameDay(new Date(a.date), cloneDay)
      );

      let circleColor = "";
      if (attendance) {
        if (attendance.status === "masuk") circleColor = "bg-green-400";
        if (attendance.status === "tidak_masuk") circleColor = "bg-red-500";
        if (attendance.status === "lembur") circleColor = "bg-yellow-400";
      }

      days.push(
        <div
          key={day}
          className={`flex items-center justify-center w-10 h-10 m-1 rounded-full text-sm ${
            !isSameMonth(day, new Date(year, month - 1)) ? "text-gray-400" : "text-gray-800"
          }`}
        >
          {circleColor ? (
            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${circleColor} text-white text-sm`}>
              {formattedDate}
            </div>
          ) : (
            formattedDate
          )}
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className="flex justify-center" key={day}>
        {days}
      </div>
    );
    days = [];
  }

  return (
    <div className="p-4 rounded-xl shadow-md w-80 md:w-2/5">
      <div className="bg-[#A996C5] text-white rounded-lg py-2 px-4 text-center text-base font-semibold mb-4">
        {format(new Date(year, month - 1), "EEEE, d MMMM")}
      </div>
      <div className="">
        <h2 className="text-center font-bold text-lg mb-2">{format(new Date(year, month - 1), "MMMM yyyy")}</h2>
        <div className="flex justify-center mb-2 font-bold text-gray-600">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <p key={day} className="w-10 text-center mx-1 text-sm">{day}</p>
            ))}
        </div>
        {rows}
      </div>
    </div>
  );
};

Calendar.propTypes = {
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  attendances: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const Kehadiran = () => {
  const attendances = [
    { date: "2024-08-12", status: "masuk" },
    { date: "2024-08-15", status: "tidak_masuk" },
    { date: "2024-09-12", status: "masuk" },
    { date: "2024-09-15", status: "tidak_masuk" },
    { date: "2024-09-20", status: "lembur" },
  ];

  return (
    <>
    <div className="flex flex-col h-screen"> 
        <div className="overflow-y-auto mac-scrollbar mac-scrollbar-x mac-scrollbar-y mb-20 pr-4">
            <h1 className="text-gray-500 mt-5 mb-16">Laporan Penggajian</h1>
            <div className="flex flex-col gap-6">
            {/* Alert error */}
            <div className="flex ms-auto">
                <div className="bg-red-100 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-normal border border-red-700">
                <span className=""></span> 
                <Icon icon="uiw:information-o" className="w-4 h-4" />
                Kehadiran anda tanggal 24 Januari 2024 belum terisi
                </div>
            </div>

            {/* Kalender */}
            <div className="flex flex-col md:flex-row justify-center items-start gap-8">
                <Calendar month={8} year={2024} attendances={attendances} />
                <Calendar month={9} year={2024} attendances={attendances} />
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-col md:flex-row gap-6 justify-center text-sm">
                <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-gray-700">Tidak Masuk (Sakit, Izin, Alpa)</span>
                </div>
                <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                <span className="text-gray-700">Masuk</span>
                </div>
                <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-700">Lembur</span>
                </div>
            </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default Kehadiran;
