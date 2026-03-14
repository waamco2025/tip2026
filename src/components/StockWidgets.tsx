"use client";

import { useEffect, useState } from "react";

interface StockData {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  updated: string;
  sparkline: number[];
}

function Sparkline({
  data,
  color,
  width = 368,
  height = 80,
}: {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}) {
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const padding = 8;
  const points = data
    .map((v, i) => {
      const x = padding + (i / (data.length - 1)) * (width - padding * 2);
      const y = height - padding - ((v - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="w-full h-full"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function nasdaqUrl(ticker: string) {
  return `https://www.nasdaq.com/market-activity/stocks/${ticker.toLowerCase()}`;
}

function formatVolume(v: number) {
  if (v >= 1000000) return `Vol: ${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `Vol: ${(v / 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  return `Vol: ${v.toLocaleString()}`;
}

/** Stoic (dark) variant */
export function StoicStockWidgets() {
  const [stocks, setStocks] = useState<StockData[] | null>(null);

  useEffect(() => {
    fetch("/api/stocks")
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setStocks(d); })
      .catch(() => {});
  }, []);

  if (!stocks) {
    return (
      <div className="flex gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 h-[280px] bg-thayer-surface border border-thayer-border rounded-sm animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-6">
      {stocks.map((s) => {
        const up = s.change >= 0;
        return (
          <div
            key={s.ticker}
            className="flex-1 flex flex-col gap-4 bg-thayer-surface border border-thayer-border p-7 rounded-sm"
          >
            <div className="flex justify-between items-center">
              <a href={nasdaqUrl(s.ticker)} target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:underline">{s.ticker}</a>
              <a href={nasdaqUrl(s.ticker)} target="_blank" rel="noopener noreferrer" className="text-thayer-text-muted text-[11px] font-semibold tracking-[1px] hover:underline">
                NASDAQ
              </a>
            </div>
            <a href={nasdaqUrl(s.ticker)} target="_blank" rel="noopener noreferrer" className="text-thayer-text-secondary text-xs hover:underline">{s.name}</a>
            <div className="flex items-center gap-3">
              <a href={nasdaqUrl(s.ticker)} target="_blank" rel="noopener noreferrer" className="font-playfair text-4xl hover:underline">
                ${s.price.toFixed(2)}
              </a>
              <div
                className={`flex items-center gap-1 px-2.5 py-1 rounded ${
                  up ? "bg-thayer-badge-bg" : "bg-[#3D1A1A]"
                }`}
              >
                <span
                  className={`text-xs font-semibold ${
                    up ? "text-thayer-gold" : "text-[#FF5C5C]"
                  }`}
                >
                  {up ? "+" : ""}
                  {s.change.toFixed(2)} ({s.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
            <a href={nasdaqUrl(s.ticker)} target="_blank" rel="noopener noreferrer" className="block w-full h-20 bg-thayer-navy border border-thayer-border rounded-sm overflow-hidden hover:opacity-80 transition-opacity">
              <Sparkline
                data={s.sparkline}
                color={up ? "#00D776" : "#FF5C5C"}
              />
            </a>
            <div className="flex justify-between">
              <span className="text-thayer-text-muted text-[11px]">
                {formatVolume(s.volume)}
              </span>
              <span className="text-thayer-text-muted text-[11px]">
                Last updated: {s.updated}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Modern (light) variant */
export function ModernStockWidgets() {
  const [stocks, setStocks] = useState<StockData[] | null>(null);

  useEffect(() => {
    fetch("/api/stocks")
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d)) setStocks(d); })
      .catch(() => {});
  }, []);

  if (!stocks) {
    return (
      <div className="flex gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 h-[280px] border border-[#E5E5E5] animate-pulse bg-[#FAFAFA]" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-6">
      {stocks.map((s) => {
        const up = s.change >= 0;
        return (
          <div
            key={s.ticker}
            className="flex-1 flex flex-col gap-4 p-7 border border-[#E5E5E5]"
          >
            <div className="flex justify-between items-center">
              <a href={nasdaqUrl(s.ticker)} target="_blank" rel="noopener noreferrer" className="text-[#111] text-sm font-semibold hover:underline">
                {s.ticker}
              </a>
              <a
                href={nasdaqUrl(s.ticker)} target="_blank" rel="noopener noreferrer"
                className={`text-[11px] font-medium px-2.5 py-1 rounded hover:opacity-80 ${
                  up
                    ? "bg-[#E8F5E9] text-[#2E7D32]"
                    : "bg-[#FFF3E0] text-[#E65100]"
                }`}
              >
                NASDAQ
              </a>
            </div>
            <a href={nasdaqUrl(s.ticker)} target="_blank" rel="noopener noreferrer" className="text-[#999] text-xs hover:underline">{s.name}</a>
            <div className="flex items-center gap-3">
              <a href={nasdaqUrl(s.ticker)} target="_blank" rel="noopener noreferrer" className="font-playfair text-[28px] text-[#111] hover:underline">
                ${s.price.toFixed(2)}
              </a>
              <span
                className={`text-[13px] font-medium ${
                  up ? "text-[#2E7D32]" : "text-[#C62828]"
                }`}
              >
                {up ? "+" : ""}
                {s.change.toFixed(2)} ({s.changePercent.toFixed(2)}%)
              </span>
            </div>
            <a href={nasdaqUrl(s.ticker)} target="_blank" rel="noopener noreferrer" className="block w-full h-20 bg-[#F5F5F5] border border-[#E5E5E5] rounded-sm overflow-hidden hover:opacity-80 transition-opacity">
              <Sparkline
                data={s.sparkline}
                color={up ? "#2E7D32" : "#C62828"}
              />
            </a>
            <div className="flex justify-between">
              <span className="text-[#999] text-[11px]">
                {formatVolume(s.volume)}
              </span>
              <span className="text-[#999] text-[11px]">{s.updated}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
