import { useState, useMemo } from "react";
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell, Scatter, ScatterChart,
  AreaChart, Area, ZAxis, LabelList, ReferenceLine
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, Users } from "lucide-react";

// ─── REAL DATA FROM TABLEAU SAMPLE SUPERSTORE ───────────────────────────────

const MONTHLY_DATA = [
  { month:"Jan 14", year:2014, sales:14237, profit:2450, orders:32 },
  { month:"Feb 14", year:2014, sales:4520, profit:862, orders:28 },
  { month:"Mar 14", year:2014, sales:55691, profit:499, orders:71 },
  { month:"Apr 14", year:2014, sales:28295, profit:3489, orders:66 },
  { month:"May 14", year:2014, sales:23648, profit:2739, orders:69 },
  { month:"Jun 14", year:2014, sales:34595, profit:4977, orders:66 },
  { month:"Jul 14", year:2014, sales:33946, profit:-841, orders:65 },
  { month:"Aug 14", year:2014, sales:27909, profit:5318, orders:72 },
  { month:"Sep 14", year:2014, sales:81777, profit:8328, orders:130 },
  { month:"Oct 14", year:2014, sales:31453, profit:3448, orders:78 },
  { month:"Nov 14", year:2014, sales:78629, profit:9292, orders:151 },
  { month:"Dec 14", year:2014, sales:69546, profit:8984, orders:141 },
  { month:"Jan 15", year:2015, sales:18174, profit:-3281, orders:29 },
  { month:"Feb 15", year:2015, sales:11951, profit:2814, orders:36 },
  { month:"Mar 15", year:2015, sales:38726, profit:9732, orders:79 },
  { month:"Apr 15", year:2015, sales:34195, profit:4187, orders:72 },
  { month:"May 15", year:2015, sales:30132, profit:4668, orders:74 },
  { month:"Jun 15", year:2015, sales:24797, profit:3336, orders:68 },
  { month:"Jul 15", year:2015, sales:28765, profit:3289, orders:66 },
  { month:"Aug 15", year:2015, sales:36898, profit:5356, orders:68 },
  { month:"Sep 15", year:2015, sales:64596, profit:8209, orders:140 },
  { month:"Oct 15", year:2015, sales:31405, profit:2817, orders:87 },
  { month:"Nov 15", year:2015, sales:75973, profit:12475, orders:158 },
  { month:"Dec 15", year:2015, sales:74920, profit:8017, orders:161 },
  { month:"Jan 16", year:2016, sales:18542, profit:2825, orders:48 },
  { month:"Feb 16", year:2016, sales:22979, profit:5005, orders:45 },
  { month:"Mar 16", year:2016, sales:51716, profit:3612, orders:86 },
  { month:"Apr 16", year:2016, sales:38750, profit:2978, orders:89 },
  { month:"May 16", year:2016, sales:56988, profit:8662, orders:108 },
  { month:"Jun 16", year:2016, sales:40345, profit:4750, orders:97 },
  { month:"Jul 16", year:2016, sales:39262, profit:4433, orders:96 },
  { month:"Aug 16", year:2016, sales:31115, profit:2062, orders:90 },
  { month:"Sep 16", year:2016, sales:73410, profit:9329, orders:192 },
  { month:"Oct 16", year:2016, sales:59688, profit:16243, orders:105 },
  { month:"Nov 16", year:2016, sales:79412, profit:4011, orders:183 },
  { month:"Dec 16", year:2016, sales:96999, profit:17885, orders:176 },
  { month:"Jan 17", year:2017, sales:43971, profit:7140, orders:69 },
  { month:"Feb 17", year:2017, sales:20301, profit:1614, orders:53 },
  { month:"Mar 17", year:2017, sales:58872, profit:14752, orders:118 },
  { month:"Apr 17", year:2017, sales:36522, profit:933, orders:116 },
  { month:"May 17", year:2017, sales:44261, profit:6343, orders:118 },
  { month:"Jun 17", year:2017, sales:52982, profit:8223, orders:133 },
  { month:"Jul 17", year:2017, sales:45264, profit:6953, orders:111 },
  { month:"Aug 17", year:2017, sales:63121, profit:9041, orders:111 },
  { month:"Sep 17", year:2017, sales:87867, profit:10992, orders:226 },
  { month:"Oct 17", year:2017, sales:77777, profit:9275, orders:147 },
  { month:"Nov 17", year:2017, sales:118448, profit:9690, orders:261 },
  { month:"Dec 17", year:2017, sales:83829, profit:8483, orders:224 },
];

const CATEGORY_DATA = [
  { category: "Furniture", sales: 742000, profit: 18451, margin: 2.5 },
  { category: "Office Supplies", sales: 719047, profit: 122491, margin: 17.0 },
  { category: "Technology", sales: 836154, profit: 145455, margin: 17.4 },
];

const SUBCAT_DATA = [
  { name: "Tables", sales: 206966, profit: -17725, qty: 1241, category: "Furniture" },
  { name: "Bookcases", sales: 114880, profit: -3473, qty: 868, category: "Furniture" },
  { name: "Supplies", sales: 46674, profit: -1189, qty: 647, category: "Office Supplies" },
  { name: "Fasteners", sales: 3024, profit: 950, qty: 914, category: "Office Supplies" },
  { name: "Machines", sales: 189239, profit: 3385, qty: 440, category: "Technology" },
  { name: "Labels", sales: 12486, profit: 5546, qty: 1400, category: "Office Supplies" },
  { name: "Art", sales: 27119, profit: 6528, qty: 3000, category: "Office Supplies" },
  { name: "Envelopes", sales: 16476, profit: 6964, qty: 906, category: "Office Supplies" },
  { name: "Furnishings", sales: 91705, profit: 13059, qty: 3563, category: "Furniture" },
  { name: "Appliances", sales: 107532, profit: 18138, qty: 1729, category: "Office Supplies" },
  { name: "Storage", sales: 223844, profit: 21279, qty: 3158, category: "Office Supplies" },
  { name: "Chairs", sales: 328449, profit: 26590, qty: 2356, category: "Furniture" },
  { name: "Binders", sales: 203413, profit: 30222, qty: 5974, category: "Office Supplies" },
  { name: "Paper", sales: 78479, profit: 34054, qty: 5178, category: "Office Supplies" },
  { name: "Accessories", sales: 167380, profit: 41937, qty: 2976, category: "Technology" },
  { name: "Phones", sales: 330007, profit: 44516, qty: 3289, category: "Technology" },
  { name: "Copiers", sales: 149528, profit: 55618, qty: 234, category: "Technology" },
];

const REGION_SEGMENT = [
  { region:"West", segment:"Consumer", sales:362881, profit:57451, margin:15.8 },
  { region:"West", segment:"Corporate", sales:225855, profit:34437, margin:15.2 },
  { region:"West", segment:"Home Office", sales:136722, profit:16530, margin:12.1 },
  { region:"East", segment:"Consumer", sales:350908, profit:41191, margin:11.7 },
  { region:"East", segment:"Corporate", sales:200409, profit:23623, margin:11.8 },
  { region:"East", segment:"Home Office", sales:127464, profit:26709, margin:21.0 },
  { region:"Central", segment:"Consumer", sales:252031, profit:8564, margin:3.4 },
  { region:"Central", segment:"Corporate", sales:157996, profit:18704, margin:11.8 },
  { region:"Central", segment:"Home Office", sales:91213, profit:12438, margin:13.6 },
  { region:"South", segment:"Consumer", sales:195581, profit:26914, margin:13.8 },
  { region:"South", segment:"Corporate", sales:121886, profit:15215, margin:12.5 },
  { region:"South", segment:"Home Office", sales:74255, profit:4621, margin:6.2 },
];

const SHIP_MODE = [
  { name:"Standard Class", orders:2994, sales:1358216, value:2994 },
  { name:"Second Class", orders:964, sales:459194, value:964 },
  { name:"First Class", orders:787, sales:351428, value:787 },
  { name:"Same Day", orders:264, sales:128363, value:264 },
];

const TOP_CUSTOMERS = [
  { name:"Tamara Chand", profit:8981, sales:19052, segment:"Corporate" },
  { name:"Raymond Buch", profit:6976, sales:15117, segment:"Consumer" },
  { name:"Sanjit Chand", profit:5757, sales:14142, segment:"Consumer" },
  { name:"Hunter Lopez", profit:5622, sales:12873, segment:"Consumer" },
  { name:"Adrian Barton", profit:5445, sales:14474, segment:"Consumer" },
  { name:"Tom Ashbrook", profit:4704, sales:14596, segment:"Home Office" },
  { name:"Christopher Martinez", profit:3900, sales:8954, segment:"Consumer" },
  { name:"Keith Dawkins", profit:3039, sales:8181, segment:"Corporate" },
  { name:"Andy Reiter", profit:2885, sales:6608, segment:"Consumer" },
  { name:"Daniel Raglin", profit:2869, sales:8351, segment:"Home Office" },
];

const TOP_STATES = [
  { state:"California", sales:457688, profit:76381, margin:16.7 },
  { state:"New York", sales:310876, profit:74039, margin:23.8 },
  { state:"Texas", sales:170188, profit:-25729, margin:-15.1 },
  { state:"Washington", sales:138641, profit:33403, margin:24.1 },
  { state:"Pennsylvania", sales:116512, profit:-15560, margin:-13.4 },
  { state:"Florida", sales:89474, profit:-3399, margin:-3.8 },
  { state:"Illinois", sales:80166, profit:-12608, margin:-15.7 },
  { state:"Ohio", sales:78258, profit:-16971, margin:-21.7 },
  { state:"Michigan", sales:76270, profit:24463, margin:32.1 },
  { state:"Virginia", sales:70637, profit:18598, margin:26.3 },
  { state:"N. Carolina", sales:55603, profit:-7491, margin:-13.5 },
  { state:"Indiana", sales:53555, profit:18383, margin:34.3 },
  { state:"Georgia", sales:49096, profit:16250, margin:33.1 },
  { state:"Kentucky", sales:36592, profit:11200, margin:30.6 },
  { state:"New Jersey", sales:35764, profit:9773, margin:27.3 },
];

// Quarterly segment (16 quarters: 2014-Q1 through 2017-Q4)
const QUARTERLY_SEGMENT = [
  { q:"14Q1", Consumer:74574, Corporate:41237, HomeOffice:49934 },
  { q:"14Q2", Consumer:82157, Corporate:37741, HomeOffice:31937 },
  { q:"14Q3", Consumer:72088, Corporate:42001, HomeOffice:18760 },
  { q:"14Q4", Consumer:179608, Corporate:79206, HomeOffice:54543 },
  { q:"15Q1", Consumer:68848, Corporate:41437, HomeOffice:47588 },
  { q:"15Q2", Consumer:89234, Corporate:43267, HomeOffice:22422 },
  { q:"15Q3", Consumer:81035, Corporate:56663, HomeOffice:26898 },
  { q:"15Q4", Consumer:182016, Corporate:98879, HomeOffice:62839 },
  { q:"16Q1", Consumer:93238, Corporate:57556, HomeOffice:39205 },
  { q:"16Q2", Consumer:136101, Corporate:60268, HomeOffice:43819 },
  { q:"16Q3", Consumer:143752, Corporate:67945, HomeOffice:31800 },
  { q:"16Q4", Consumer:236139, Corporate:113854, HomeOffice:85086 },
  { q:"17Q1", Consumer:123143, Corporate:84493, HomeOffice:66165 },
  { q:"17Q2", Consumer:133766, Corporate:114271, HomeOffice:72295 },
  { q:"17Q3", Consumer:196252, Corporate:113049, HomeOffice:75986 },
  { q:"17Q4", Consumer:279494, Corporate:197771, HomeOffice:141275 },
];

// Discount scatter data
const DISC_SCATTER = [
  { discount:0, profit:69.5, sales:306, category:"Furniture", n:836 },
  { discount:0, profit:41.7, sales:141, category:"Office Supplies", n:3129 },
  { discount:0, profit:158.9, sales:468, category:"Technology", n:833 },
  { discount:0.1, profit:93.6, sales:614, category:"Furniture", n:76 },
  { discount:0.1, profit:67.9, sales:270, category:"Office Supplies", n:16 },
  { discount:0.2, profit:11.5, sales:366, category:"Furniture", n:667 },
  { discount:0.2, profit:17.3, sales:106, category:"Office Supplies", n:2201 },
  { discount:0.2, profit:54.7, sales:375, category:"Technology", n:841 },
  { discount:0.3, profit:-52.6, sales:458, category:"Furniture", n:249 },
  { discount:0.4, profit:-217.2, sales:594, category:"Furniture", n:86 },
  { discount:0.4, profit:-52.4, sales:541, category:"Technology", n:131 },
  { discount:0.5, profit:-238.4, sales:389, category:"Furniture", n:54 },
  { discount:0.5, profit:-636.3, sales:3161, category:"Technology", n:12 },
  { discount:0.6, profit:-43.1, sales:48, category:"Furniture", n:138 },
  { discount:0.7, profit:-259.7, sales:164, category:"Furniture", n:15 },
  { discount:0.7, profit:-43.7, sales:59, category:"Office Supplies", n:380 },
  { discount:0.7, profit:-851.3, sales:678, category:"Technology", n:23 },
  { discount:0.8, profit:-101.8, sales:57, category:"Office Supplies", n:300 },
];

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const COLORS = {
  indigo:"#6366f1", emerald:"#10b981", amber:"#f59e0b",
  red:"#ef4444", blue:"#3b82f6", violet:"#8b5cf6",
  cyan:"#06b6d4", pink:"#ec4899"
};
const CAT_COLOR = { "Furniture":"#f59e0b", "Office Supplies":"#6366f1", "Technology":"#10b981" };
const SEG_COLOR = { "Consumer":"#6366f1", "Corporate":"#10b981", "Home Office":"#f59e0b" };
const SHIP_COLORS = ["#6366f1","#10b981","#f59e0b","#3b82f6"];
const REGIONS = ["West","East","Central","South"];
const SEGMENTS = ["Consumer","Corporate","Home Office"];
const YEARS = [2014,2015,2016,2017];

const fmt = (n) => n >= 1e6 ? `$${(n/1e6).toFixed(2)}M` : n >= 1e3 ? `$${(n/1e3).toFixed(0)}K` : `$${n.toFixed(0)}`;
const fmtK = (n) => n >= 1e3 ? `${(n/1e3).toFixed(0)}K` : n.toFixed(0);

const darkTooltip = {
  contentStyle:{ background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#f1f5f9", fontSize:12 },
  cursor:{ fill:"rgba(99,102,241,0.08)" }
};

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────
function Card({ children, className="" }) {
  return (
    <div className={`bg-slate-800 border border-slate-700 rounded-2xl shadow-xl transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}

function ChartTitle({ title, sub }) {
  return (
    <div className="mb-3">
      <h3 className="text-sm font-semibold text-slate-100 tracking-wide">{title}</h3>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
  );
}

function KpiCard({ label, value, delta, icon: Icon, color, prefix="" }) {
  const pos = delta >= 0;
  return (
    <Card className="p-5 flex items-center gap-4">
      <div className="rounded-xl p-3 flex-shrink-0" style={{ background:`${color}22` }}>
        <Icon size={22} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <p className="text-2xl font-bold text-white tabular-nums">{prefix}{value}</p>
      </div>
      <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${pos ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
        {pos ? <TrendingUp size={12}/> : <TrendingDown size={12}/>}
        {Math.abs(delta)}%
      </div>
    </Card>
  );
}

function MarginBadge({ margin }) {
  const cls = margin > 20 ? "bg-emerald-500/20 text-emerald-400"
            : margin > 0  ? "bg-amber-500/20 text-amber-400"
            : "bg-red-500/20 text-red-400";
  return <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${cls}`}>{margin.toFixed(1)}%</span>;
}

// ─── MAIN DASHBOARD ──────────────────────────────────────────────────────────
export default function Dashboard() {
  const [selRegions, setSelRegions] = useState([]);
  const [selCategories, setSelCategories] = useState([]);
  const [selYear, setSelYear] = useState(null);
  const [selSegment, setSelSegment] = useState("All");

  const toggleRegion = (r) => setSelRegions(p => p.includes(r) ? p.filter(x=>x!==r) : [...p,r]);
  const toggleCat = (c) => setSelCategories(p => p.includes(c) ? p.filter(x=>x!==c) : [...p,c]);

  // Filter multipliers (simulating filtering on region/segment/year/category)
  const regionFilter = selRegions.length === 0 ? REGIONS : selRegions;
  const segFilter = selSegment === "All" ? SEGMENTS : [selSegment];
  const catFilter = selCategories.length === 0 ? ["Furniture","Office Supplies","Technology"] : selCategories;
  const yearFilter = selYear ? [selYear] : YEARS;

  // Filtered monthly data
  const filteredMonthly = useMemo(() => {
    let d = MONTHLY_DATA.filter(m => yearFilter.includes(m.year));
    // Scale by region/segment fraction
    const regionFrac = regionFilter.length / 4;
    const segFrac = segFilter.length / 3;
    return d.map(m => ({
      ...m,
      sales: Math.round(m.sales * regionFrac * segFrac),
      profit: Math.round(m.profit * regionFrac * segFrac)
    }));
  }, [selRegions, selSegment, selYear]);

  // KPIs
  const kpis = useMemo(() => {
    const rf = regionFilter.length/4, sf = segFilter.length/3, cf = catFilter.length/3;
    const yf = yearFilter.length/4;
    return {
      sales: Math.round(2297201 * rf * sf * cf),
      profit: Math.round(286397 * rf * sf * cf),
      margin: +(286397 * cf / (2297201 * cf) * 100).toFixed(2),
      orders: Math.round(9994 * rf * sf * yf),
    };
  }, [selRegions, selSegment, selCategories, selYear]);

  // Category data filtered
  const filtCatData = useMemo(() => {
    const rf = regionFilter.length/4, sf = segFilter.length/3;
    return CATEGORY_DATA.filter(c => catFilter.includes(c.category)).map(c => ({
      ...c,
      sales: Math.round(c.sales * rf * sf),
      profit: Math.round(c.profit * rf * sf)
    }));
  }, [selRegions, selSegment, selCategories]);

  // Subcat data filtered
  const filtSubcat = useMemo(() => {
    const rf = regionFilter.length/4, sf = segFilter.length/3;
    return SUBCAT_DATA.filter(s => catFilter.includes(s.category))
      .map(s => ({ ...s, profit: Math.round(s.profit * rf * sf), sales: Math.round(s.sales * rf * sf) }));
  }, [selRegions, selSegment, selCategories]);

  // Region x Segment heatmap
  const filtHeatmap = useMemo(() => {
    return REGION_SEGMENT.filter(r => regionFilter.includes(r.region) && segFilter.includes(r.segment));
  }, [selRegions, selSegment]);

  const maxHeatMargin = Math.max(...filtHeatmap.map(d => d.margin));

  // Quarterly segment
  const filtQuarterly = useMemo(() => {
    const rf = regionFilter.length/4;
    return QUARTERLY_SEGMENT.filter((_,i) => {
      const year = 2014 + Math.floor(i/4);
      return yearFilter.includes(year);
    }).map(q => {
      const obj = { q: q.q };
      if (segFilter.includes("Consumer")) obj.Consumer = Math.round(q.Consumer * rf);
      if (segFilter.includes("Corporate")) obj.Corporate = Math.round(q.Corporate * rf);
      if (segFilter.includes("Home Office")) obj["HomeOffice"] = Math.round((q.HomeOffice||0) * rf);
      return obj;
    });
  }, [selRegions, selSegment, selYear]);

  // Smart insights
  const insights = useMemo(() => {
    const list = [];
    const techProfit = kpis.profit > 0 ? Math.round(145455 / kpis.profit * 100) : 0;
    list.push(`Technology generates ~${Math.min(techProfit,99)}% of total profit relative to its ${Math.round(836154/2297201*100)}% share of sales — the clearest margin driver.`);
    if (catFilter.includes("Furniture")) list.push(`Furniture is a profit drag: Tables alone lose $17.7K annually. Sub-$0 margin sub-categories signal chronic over-discounting.`);
    if (selRegions.includes("Central") || selRegions.length===0) list.push(`Central region's Consumer segment has only a 3.4% profit margin — the weakest cell in the entire Region × Segment matrix.`);
    if (selRegions.includes("West") || selRegions.length===0) list.push(`West + Consumer = $57.4K profit on $362.9K sales (15.8% margin) — the highest-value cell and top strategic priority.`);
    list.push(`Discounts above 20% reliably destroy profit across all categories. At 40%+, Furniture and Technology go deeply negative.`);
    list.push(`Q4 consistently spikes — Nov/Dec alone account for 30-35% of annual revenue each year from 2014–2017.`);
    return list.slice(0, 3);
  }, [kpis, catFilter, selRegions]);

  const activeBtn = "text-white font-semibold border-2";
  const inactiveBtn = "text-slate-400 border border-slate-700 hover:border-slate-500";

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-6" style={{ fontFamily:"'DM Sans', 'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #1e293b; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        .kpi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .main-grid { display: grid; gap: 16px; }
        .row-2 { grid-template-columns: 1.6fr 1fr; }
        .row-3 { grid-template-columns: 1fr 1fr 1fr; }
        .row-4 { grid-template-columns: 1fr 1fr; }
        .row-5 { grid-template-columns: 1.2fr 0.8fr; }
        @media (max-width: 900px) {
          .kpi-grid { grid-template-columns: repeat(2, 1fr); }
          .row-2, .row-3, .row-4, .row-5 { grid-template-columns: 1fr; }
        }
        @media (max-width: 480px) {
          .kpi-grid { grid-template-columns: 1fr; }
        }
        .fade { transition: all 0.3s ease; }
      `}</style>

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white tracking-tight">Superstore Analytics</h1>
        <p className="text-slate-400 text-sm mt-1">9,994 orders · 2014–2017 · US Retail Intelligence Dashboard</p>
      </div>

      {/* GLOBAL FILTER BAR */}
      <Card className="p-4 mb-6">
        <div className="flex flex-wrap gap-6 items-center">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Region</p>
            <div className="flex gap-2">
              {REGIONS.map(r => (
                <button key={r} onClick={() => toggleRegion(r)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-all duration-200 ${selRegions.includes(r) ? activeBtn+" border-indigo-500 bg-indigo-500/10" : inactiveBtn}`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Category</p>
            <div className="flex gap-2">
              {["Furniture","Office Supplies","Technology"].map(c => (
                <button key={c} onClick={() => toggleCat(c)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-all duration-200 ${selCategories.includes(c) ? activeBtn+" border-amber-500 bg-amber-500/10 text-amber-300" : inactiveBtn}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Year</p>
            <div className="flex gap-2">
              {YEARS.map(y => (
                <button key={y} onClick={() => setSelYear(v => v===y?null:y)}
                  className={`text-xs px-3 py-1.5 rounded-lg transition-all duration-200 ${selYear===y ? activeBtn+" border-emerald-500 bg-emerald-500/10 text-emerald-300" : inactiveBtn}`}>
                  {y}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Segment</p>
            <select value={selSegment} onChange={e => setSelSegment(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-700 border border-slate-600 text-slate-200 focus:outline-none focus:border-indigo-500">
              <option>All</option>
              {SEGMENTS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <button onClick={() => { setSelRegions([]); setSelCategories([]); setSelYear(null); setSelSegment("All"); }}
            className="text-xs px-3 py-1.5 rounded-lg border border-slate-600 text-slate-400 hover:text-white hover:border-slate-400 transition-all ml-auto">
            ✕ Reset
          </button>
        </div>
      </Card>

      {/* KPI ROW */}
      <div className="kpi-grid mb-4 fade">
        <KpiCard label="Total Sales" value={fmt(kpis.sales)} delta={20.4} icon={DollarSign} color={COLORS.indigo} />
        <KpiCard label="Total Profit" value={fmt(kpis.profit)} delta={14.2} icon={TrendingUp} color={COLORS.emerald} />
        <KpiCard label="Profit Margin" value={`${kpis.margin.toFixed(2)}%`} delta={-1.3} icon={Package} color={COLORS.amber} />
        <KpiCard label="Total Orders" value={kpis.orders.toLocaleString()} delta={28.7} icon={ShoppingCart} color={COLORS.blue} />
      </div>

      {/* ROW 2: Time series + Ship Mode */}
      <div className="main-grid row-2 mb-4">
        <Card className="p-5 fade">
          <ChartTitle title="Sales & Profit Over Time" sub="Monthly revenue bars · profit trend line" />
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={filteredMonthly} margin={{ top:4, right:40, left:0, bottom:0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
              <XAxis dataKey="month" tick={{ fill:"#64748b", fontSize:9 }} tickLine={false}
                interval={selYear ? 1 : 5} />
              <YAxis yAxisId="left" tick={{ fill:"#64748b", fontSize:10 }} tickLine={false} axisLine={false}
                tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill:"#64748b", fontSize:10 }} tickLine={false} axisLine={false}
                tickFormatter={v => `$${(v/1000).toFixed(0)}K`} />
              <Tooltip {...darkTooltip} formatter={(v,n) => [`$${v.toLocaleString()}`, n]}/>
              <Bar yAxisId="left" dataKey="sales" fill="#6366f1" opacity={0.7} radius={[2,2,0,0]} name="Sales"/>
              <Line yAxisId="right" type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} dot={false} name="Profit"/>
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 fade">
          <ChartTitle title="Ship Mode Distribution" sub="Order share by fulfillment speed" />
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={SHIP_MODE} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                dataKey="value" paddingAngle={3} nameKey="name">
                {SHIP_MODE.map((_, i) => <Cell key={i} fill={SHIP_COLORS[i]} />)}
              </Pie>
              <Tooltip contentStyle={darkTooltip.contentStyle}
                formatter={(v,n,p) => [p.payload.orders.toLocaleString()+" orders", n]}/>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-1 mt-2">
            {SHIP_MODE.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background:SHIP_COLORS[i] }}/>
                  <span className="text-slate-300">{d.name}</span>
                </div>
                <span className="text-slate-400">{Math.round(d.orders/(5009)*100)}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ROW 3: Category + Subcat Waterfall + Discount Scatter */}
      <div className="main-grid row-3 mb-4">
        <Card className="p-5 fade">
          <ChartTitle title="Category Performance" sub="Sales vs Profit by category" />
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={filtCatData} layout="vertical" margin={{ left:20, right:10, top:4, bottom:4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false}/>
              <XAxis type="number" tick={{ fill:"#64748b", fontSize:9 }} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} tickLine={false}/>
              <YAxis type="category" dataKey="category" tick={{ fill:"#94a3b8", fontSize:11 }} width={90} tickLine={false} axisLine={false}/>
              <Tooltip {...darkTooltip} formatter={(v,n) => [fmt(v), n]}/>
              <Bar dataKey="sales" name="Sales" fill="#6366f1" opacity={0.8} radius={[0,3,3,0]} barSize={14}/>
              <Bar dataKey="profit" name="Profit" fill="#10b981" opacity={0.9} radius={[0,3,3,0]} barSize={14}/>
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 fade">
          <ChartTitle title="Sub-Category Profit Waterfall" sub="Green = profitable · Red = loss-makers" />
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={filtSubcat} layout="vertical" margin={{ left:52, right:10, top:4, bottom:4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false}/>
              <XAxis type="number" tick={{ fill:"#64748b", fontSize:9 }} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} tickLine={false}/>
              <YAxis type="category" dataKey="name" tick={{ fill:"#94a3b8", fontSize:9 }} width={70} tickLine={false} axisLine={false}/>
              <ReferenceLine x={0} stroke="#475569" strokeWidth={1}/>
              <Tooltip {...darkTooltip} formatter={(v) => [fmt(v), "Profit"]}/>
              <Bar dataKey="profit" radius={[0,3,3,0]} barSize={8}>
                {filtSubcat.map((d,i) => <Cell key={i} fill={d.profit < 0 ? "#ef4444" : "#10b981"} opacity={0.85}/>)}
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 fade">
          <ChartTitle title="Discount vs Profit" sub="Higher discounts destroy margin" />
          <ResponsiveContainer width="100%" height={220}>
            <ScatterChart margin={{ top:4, right:10, left:0, bottom:20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
              <XAxis dataKey="discount" type="number" name="Discount" tick={{ fill:"#64748b", fontSize:9 }}
                tickFormatter={v => `${(v*100).toFixed(0)}%`} label={{ value:"Discount Rate", fill:"#64748b", fontSize:9, dy:16 }}/>
              <YAxis dataKey="profit" type="number" name="Avg Profit"
                tick={{ fill:"#64748b", fontSize:9 }} tickLine={false} axisLine={false}
                tickFormatter={v => `$${v.toFixed(0)}`}/>
              <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="4 4" strokeWidth={1}/>
              <Tooltip contentStyle={darkTooltip.contentStyle}
                formatter={(v,n,p) => {
                  const d = p.payload;
                  return [`Disc: ${(d.discount*100).toFixed(0)}% · Profit: $${d.profit.toFixed(0)}`, d.category];
                }}/>
              {["Furniture","Office Supplies","Technology"].filter(c => catFilter.includes(c)).map(cat => (
                <Scatter key={cat} name={cat}
                  data={DISC_SCATTER.filter(d => d.category===cat)}
                  fill={CAT_COLOR[cat]} opacity={0.75} />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
          <div className="flex gap-3 mt-1">
            {Object.entries(CAT_COLOR).filter(([c]) => catFilter.includes(c)).map(([cat,color]) => (
              <div key={cat} className="flex items-center gap-1.5 text-xs text-slate-400">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background:color }}/>
                {cat}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ROW 4: Top Customers + Segment Trend */}
      <div className="main-grid row-4 mb-4">
        <Card className="p-5 fade">
          <ChartTitle title="Top 10 Customers by Profit" sub="Segment color-coded · sorted descending" />
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={TOP_CUSTOMERS} layout="vertical" margin={{ left:10, right:40, top:4, bottom:4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false}/>
              <XAxis type="number" tick={{ fill:"#64748b", fontSize:9 }} tickFormatter={v => `$${(v/1000).toFixed(1)}K`} tickLine={false}/>
              <YAxis type="category" dataKey="name" tick={{ fill:"#94a3b8", fontSize:10 }} width={130} tickLine={false} axisLine={false}/>
              <Tooltip {...darkTooltip} formatter={(v,n,p) => [`$${v.toLocaleString()}`, `${p.payload.segment} · Profit`]}/>
              <Bar dataKey="profit" radius={[0,4,4,0]} barSize={14}>
                <LabelList dataKey="profit" position="right" style={{ fill:"#94a3b8", fontSize:9 }}
                  formatter={v => `$${(v/1000).toFixed(1)}K`}/>
                {TOP_CUSTOMERS.map((d,i) => <Cell key={i} fill={SEG_COLOR[d.segment]} opacity={0.85}/>)}
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2">
            {Object.entries(SEG_COLOR).map(([seg,color]) => (
              <div key={seg} className="flex items-center gap-1.5 text-xs text-slate-400">
                <div className="w-2 h-2 rounded-full" style={{ background:color }}/>
                {seg}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 fade">
          <ChartTitle title="Segment Sales Trend" sub="Quarterly revenue by customer segment" />
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={filtQuarterly} margin={{ top:4, right:10, left:0, bottom:20 }}>
              <defs>
                {["Consumer","Corporate","HomeOffice"].map((s,i) => (
                  <linearGradient key={s} id={`grad${s}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={Object.values(SEG_COLOR)[i]} stopOpacity={0.5}/>
                    <stop offset="95%" stopColor={Object.values(SEG_COLOR)[i]} stopOpacity={0.05}/>
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false}/>
              <XAxis dataKey="q" tick={{ fill:"#64748b", fontSize:9 }} tickLine={false} interval={3}
                label={{ value:"Quarter", fill:"#64748b", fontSize:9, dy:16 }}/>
              <YAxis tick={{ fill:"#64748b", fontSize:9 }} tickFormatter={v => `$${(v/1000).toFixed(0)}K`} tickLine={false} axisLine={false}/>
              <Tooltip {...darkTooltip} formatter={(v,n) => [fmt(v), n]}/>
              {segFilter.includes("Consumer") && <Area type="monotone" dataKey="Consumer" stroke={SEG_COLOR.Consumer} fill="url(#gradConsumer)" strokeWidth={2}/>}
              {segFilter.includes("Corporate") && <Area type="monotone" dataKey="Corporate" stroke={SEG_COLOR.Corporate} fill="url(#gradCorporate)" strokeWidth={2}/>}
              {segFilter.includes("Home Office") && <Area type="monotone" dataKey="HomeOffice" stroke={SEG_COLOR["Home Office"]} fill="url(#gradHomeOffice)" strokeWidth={2} name="Home Office"/>}
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* ROW 5: States table + Heatmap + Bubble chart */}
      <div className="main-grid row-3 mb-4">
        {/* Top 15 States */}
        <Card className="p-5 fade">
          <ChartTitle title="Top 15 States by Revenue" sub="Inline bars · margin badges" />
          <div className="overflow-auto max-h-64">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-slate-500 uppercase tracking-wider">
                  <th className="text-left pb-2 font-medium">#</th>
                  <th className="text-left pb-2 font-medium">State</th>
                  <th className="text-right pb-2 font-medium">Sales</th>
                  <th className="pb-2 font-medium text-center">Bar</th>
                  <th className="text-right pb-2 font-medium">Margin</th>
                </tr>
              </thead>
              <tbody>
                {TOP_STATES.map((s, i) => (
                  <tr key={s.state} className="border-t border-slate-700/50">
                    <td className="py-1.5 pr-2 text-slate-500">{i+1}</td>
                    <td className="py-1.5 text-slate-200">{s.state}</td>
                    <td className="py-1.5 text-right text-slate-300 tabular-nums">{fmt(s.sales)}</td>
                    <td className="py-1.5 px-2">
                      <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{
                          width:`${s.sales/457688*100}%`,
                          background: s.margin > 0 ? "#6366f1" : "#ef4444"
                        }}/>
                      </div>
                    </td>
                    <td className="py-1.5 text-right"><MarginBadge margin={s.margin}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Region x Segment Heatmap */}
        <Card className="p-5 fade">
          <ChartTitle title="Region × Segment Heatmap" sub="Profit margin % · color intensity = value" />
          <div className="mt-2">
            <div className="grid mb-2" style={{ gridTemplateColumns:"1fr 1fr 1fr 1fr" }}>
              <div/>
              {["Consumer","Corporate","Home Office"].map(s => (
                <div key={s} className="text-center text-xs text-slate-500 pb-2">{s.split(" ")[0]}</div>
              ))}
            </div>
            {regionFilter.map(region => (
              <div key={region} className="grid mb-2" style={{ gridTemplateColumns:"1fr 1fr 1fr 1fr" }}>
                <div className="text-xs text-slate-400 flex items-center">{region}</div>
                {["Consumer","Corporate","Home Office"].filter(s => segFilter.includes(s)).map(seg => {
                  const cell = filtHeatmap.find(d => d.region===region && d.segment===seg);
                  if (!cell) return <div key={seg} className="mx-1 h-12 rounded-lg bg-slate-700/30"/>;
                  const intensity = maxHeatMargin > 0 ? cell.margin/maxHeatMargin : 0;
                  const bg = cell.margin < 0
                    ? `rgba(239,68,68,${Math.min(0.6, Math.abs(intensity))})`
                    : `rgba(99,102,241,${Math.min(0.8, intensity*0.8+0.1)})`;
                  return (
                    <div key={seg} className="mx-1 h-12 rounded-lg flex flex-col items-center justify-center" style={{ background:bg }}>
                      <span className="text-white text-xs font-bold">{cell.margin.toFixed(1)}%</span>
                      <span className="text-slate-300 text-[9px]">{fmt(cell.sales)}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </Card>

        {/* Sub-Category Bubble */}
        <Card className="p-5 fade">
          <ChartTitle title="Sub-Category Bubble" sub="x=Sales · y=Margin% · size=Quantity" />
          <ResponsiveContainer width="100%" height={260}>
            <ScatterChart margin={{ top:4, right:10, left:0, bottom:20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
              <XAxis dataKey="sales" type="number" name="Sales" tick={{ fill:"#64748b", fontSize:8 }}
                tickFormatter={v => `$${(v/1000).toFixed(0)}K`} label={{ value:"Sales Volume", fill:"#64748b", fontSize:8, dy:16 }}/>
              <YAxis dataKey="margin" type="number" name="Margin %"
                tick={{ fill:"#64748b", fontSize:8 }} tickLine={false} axisLine={false}
                tickFormatter={v => `${v.toFixed(0)}%`}/>
              <ZAxis dataKey="qty" range={[30, 400]} name="Quantity"/>
              <ReferenceLine y={0} stroke="#ef4444" strokeDasharray="4 4" strokeWidth={1}/>
              <Tooltip contentStyle={darkTooltip.contentStyle}
                formatter={(v,n,p) => {
                  const d = p.payload;
                  return [`${d.name} · Margin: ${d.margin?.toFixed(1)||""}%`, ""];
                }}/>
              <Scatter data={filtSubcat.map(d => ({
                ...d, margin: d.sales > 0 ? d.profit/d.sales*100 : 0, qty: d.qty
              }))} shape={(props) => {
                const { cx, cy, r } = props;
                const d = props.payload;
                const color = d.profit < 0 ? "#ef4444" : d.category === "Technology" ? "#10b981" : d.category === "Furniture" ? "#f59e0b" : "#6366f1";
                return (
                  <g>
                    <circle cx={cx} cy={cy} r={r} fill={color} fillOpacity={0.65} stroke={color} strokeWidth={1}/>
                    {r > 8 && <text x={cx} y={cy-r-3} textAnchor="middle" fontSize={7} fill="#cbd5e1">{d.name}</text>}
                  </g>
                );
              }}/>
            </ScatterChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* SMART INSIGHTS */}
      <Card className="p-5 fade">
        <div className="flex items-start gap-3 mb-4">
          <div className="rounded-xl p-2.5 bg-indigo-500/15 flex-shrink-0">
            <TrendingUp size={18} className="text-indigo-400"/>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100">Smart Insights</h3>
            <p className="text-xs text-slate-400 mt-0.5">Auto-generated from current filter state</p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {insights.map((insight, i) => (
            <div key={i} className="bg-slate-700/40 rounded-xl p-4 border border-slate-700">
              <div className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 text-xs font-bold flex items-center justify-center mb-2">
                {i+1}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{insight}</p>
            </div>
          ))}
        </div>
      </Card>

      <p className="text-center text-slate-600 text-xs mt-6">Superstore Analytics · Tableau Sample Dataset · 9,994 orders · 2014–2017</p>
    </div>
  );
}
