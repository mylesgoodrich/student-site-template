"use client";

import {
  TrendingUp,
  ShieldCheck,
  BarChart3,
  CalendarCheck,
  FileCheck2,
  CircleAlert,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fadeIn, fadeUp } from "../lib/motion";

const KPI_CARDS = [
  {
    icon: TrendingUp,
    label: "GPA",
    value: "3.9",
    subtext: "Dean's List",
  },
  {
    icon: ShieldCheck,
    label: "Controls documented",
    value: "31",
    subtext: "Risk-mapped",
  },
  {
    icon: BarChart3,
    label: "Dashboards built",
    value: "3+",
    subtext: "Decision support",
  },
  {
    icon: CalendarCheck,
    label: "Semesters improving",
    value: "5+",
    subtext: "Consistent progress",
  },
];

const PERFORMANCE_TREND_DATA = [
  { name: "Sem 1", semester: 1, gpa: 2.5 },
  { name: "Sem 2", semester: 2, gpa: 2.9 },
  { name: "Sem 3", semester: 3, gpa: 3.2 },
  { name: "Sem 4", semester: 4, gpa: 3.4 },
  { name: "Sem 5", semester: 5, gpa: 3.9 },
];

const AUDIT_MINDSET = [
  {
    icon: CircleAlert,
    label: "Risk",
    subtext: "Identify & document",
  },
  {
    icon: ShieldCheck,
    label: "Control",
    subtext: "Map & test",
  },
  {
    icon: FileCheck2,
    label: "Evidence",
    subtext: "Traceable & repeatable",
  },
];

const CHART_COLORS = {
  line: "#FDD023",
  grid: "rgba(255, 255, 255, 0.06)",
  axis: "rgba(255, 255, 255, 0.5)",
  tooltipBg: "#1a1820",
  tooltipBorder: "rgba(70, 29, 124, 0.4)",
  tooltipLabel: "rgba(253, 208, 35, 0.9)",
};

function PerformanceTrendChart() {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={PERFORMANCE_TREND_DATA}
          margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={CHART_COLORS.grid}
            strokeWidth={0.5}
            vertical={false}
          />
          <XAxis
            dataKey="name"
            axisLine={{ stroke: CHART_COLORS.axis }}
            tick={{ fill: CHART_COLORS.axis, fontSize: 11 }}
            tickLine={false}
          />
          <YAxis
            dataKey="gpa"
            domain={[2.4, 4.0]}
            axisLine={false}
            tick={{ fill: CHART_COLORS.axis, fontSize: 11 }}
            tickLine={false}
            tickFormatter={(v) => v.toFixed(1)}
            width={28}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: CHART_COLORS.tooltipBg,
              border: `1px solid ${CHART_COLORS.tooltipBorder}`,
              borderRadius: "8px",
              padding: "8px 12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
            labelStyle={{ color: CHART_COLORS.tooltipLabel, fontWeight: 600 }}
            itemStyle={{ color: "rgba(255,255,255,0.85)", fontSize: 13 }}
            formatter={(value?: number) =>
              typeof value === "number" ? [value.toFixed(2), "GPA"] : ["", "GPA"]
            }
            labelFormatter={(label) => `${label}`}
            cursor={{ stroke: CHART_COLORS.grid, strokeWidth: 1 }}
          />
          <Line
            type="monotone"
            dataKey="gpa"
            stroke={CHART_COLORS.line}
            strokeWidth={2}
            dot={{ fill: CHART_COLORS.line, stroke: "#461d7c", strokeWidth: 1, r: 3 }}
            activeDot={{ r: 4, stroke: "#461d7c", strokeWidth: 1 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function OperatingSystemDashboard() {
  const shouldReduceMotion = useReducedMotion();
  const sectionVariants = shouldReduceMotion ? fadeIn : fadeUp;

  return (
    <motion.section
      className="rounded-3xl border border-[rgba(70,29,124,0.25)] bg-[#14121b] p-6 shadow-lg"
      variants={sectionVariants}
      initial="initial"
      animate="animate"
      aria-labelledby="operating-system-heading"
    >
      <header className="mb-6">
        <h2
          id="operating-system-heading"
          className="text-xl font-semibold tracking-tight text-white"
        >
          Operating System
        </h2>
        <p className="mt-1 text-sm text-white/80">
          How I structure work so it holds up under review.
        </p>
      </header>

      {/* Row 1: KPI cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {KPI_CARDS.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            className="flex items-start gap-3 rounded-xl border border-[rgba(253,208,35,0.12)] bg-[#1a1820] p-6"
            variants={sectionVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: i * 0.05 }}
            whileHover={
              shouldReduceMotion ? undefined : { y: -4, transition: { duration: 0.2 } }
            }
          >
            <div className="rounded-xl bg-brand-gold/15 p-2 text-brand-gold">
              <kpi.icon className="h-5 w-5" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wider text-white/70">
                {kpi.label}
              </p>
              <p className="mt-0.5 text-2xl font-semibold tabular-nums text-white">
                {kpi.value}
              </p>
              <p className="mt-0.5 text-[11px] text-white/65">{kpi.subtext}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Row 2: Chart + Audit Mindset */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <motion.div
          className="rounded-xl border border-[rgba(253,208,35,0.12)] bg-[#1a1820] p-6"
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.15 }}
          whileHover={
            shouldReduceMotion ? undefined : { y: -4, transition: { duration: 0.2 } }
          }
        >
          <h3 className="text-sm font-semibold text-white">GPA Trend</h3>
          <p className="mt-0.5 text-[11px] text-white/65">
            Semester-over-semester
          </p>
          <div className="mt-4 flex justify-center">
            <PerformanceTrendChart />
          </div>
        </motion.div>

        <motion.div
          className="rounded-xl border border-[rgba(253,208,35,0.12)] bg-[#1a1820] p-6"
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.2 }}
          whileHover={
            shouldReduceMotion ? undefined : { y: -4, transition: { duration: 0.2 } }
          }
        >
          <h3 className="text-sm font-semibold text-white">Audit Mindset</h3>
          <p className="mt-0.5 text-[11px] text-white/65">
            Risk → Control → Evidence
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {AUDIT_MINDSET.map((item) => (
              <motion.div
                key={item.label}
                className="flex flex-1 min-w-[100px] items-center gap-2 rounded-xl border border-[rgba(253,208,35,0.1)] bg-[#0f0e12] px-3 py-2.5"
                whileHover={
                  shouldReduceMotion ? undefined : { y: -2, transition: { duration: 0.15 } }
                }
              >
                <item.icon
                  className="h-4 w-4 shrink-0 text-brand-gold"
                  aria-hidden
                />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white">
                    {item.label}
                  </p>
                  <p className="text-[10px] text-white/65">{item.subtext}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
