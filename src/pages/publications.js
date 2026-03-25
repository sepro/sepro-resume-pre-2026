import React, { useState } from "react"
import Layout from "../components/layout"
import PublicationData from "../../content/publications.yaml"
import PatentData from "../../content/patents.yaml"
import Citations from "../components/citations"
import Publication from "../components/publication"

const Publications = () => {
  const [selectedYear, setSelectedYear] = useState("All")

  const handleYearChange = event => {
    setSelectedYear(event.target.value)
  }

  // Combine publications and patents into a single list with a type marker
  const combinedItems = [
    ...PublicationData.map(item => ({ ...item, type: 'publication' })),
    ...PatentData.map(item => ({ ...item, type: 'patent' }))
  ]
    .filter(item => selectedYear === "All" ? true : item.Year.toString() === selectedYear)
    .sort((a, b) => b.Year - a.Year)

  const years = [
    ...new Set([
      ...PublicationData.map(item => item.Year),
      ...PatentData.map(item => item.Year)
    ])
  ].sort((a, b) => b - a)

  const items = combinedItems.map((item, index) => (
    <Publication
      key={index}
      title={item.Title}
      authors={item.type === 'patent' ? item.Inventors : item.Authors}
      journal={item.type === 'patent' ? "Patent: " + item.Identifier : item.Journal}
      year={item.Year}
      preprint={item.type === 'patent' ? 0 : item.Preprint}
      badges={item.URLs || []}
    />
  ))

  return (
    <Layout
      pageTitle="Publications and Patents"
      pageDescription="an overview of my scientific publications and patents"
      showTitle={true}
    >
      <Citations />
      <div className="citations">
        * These authors contributed equally to this work
      </div>
      <div>
        <label htmlFor="year-filter">Filter by year: </label>
        <select id="year-filter" value={selectedYear} onChange={handleYearChange}>
          <option value="All">All</option>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div>
        {items}
      </div>
    </Layout>
  )
}

export default Publications