import React from "react";
import ReactDataGrid from "react-data-grid";
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import download from 'downloadjs';



const defaultColumnProperties = {
  width: 90
};

const columns = [
  { key: "tooth", name: "Tooth", editable: false, width: 60, frozen: true },
  { key: "triadan", name: "Triadan", editable: false, width: 70, frozen: true },
  { key: "mobility", name: "Mobility", editable: true, width: 85 },
  { key: "recession", name: "Recession", editable: true, width: 85 },
  { key: "pocket", name: "Pocket", editable: true, width: 70 },
  { key: "furcation", name: "Furcation", editable: true, width: 90 },
  { key: "hyperplasia", name: "Hyperplasia", editable: true, width: 110 },
  { key: "calculus", name: "Calculus", editable: true, width: 85 },
  { key: "gingivitis", name: "Gingivitis", editable: true, width: 90 },
  { key: "pdstate", name: "PD State", editable: true, width: 85 },

];

const rows = [
  { tooth: "I1", triadan: 101 },
  { tooth: "I2", triadan: 102 },
  { tooth: "I3", triadan: 103 },
  { tooth: "C", triadan: 104 },
  { tooth: "P1", triadan: 105 },
  { tooth: "P2", triadan: 106 },
  { tooth: "P3", triadan: 107 },
  { tooth: "P4", triadan: 108 },
  { tooth: "M1", triadan: 109 },
  { tooth: "M2", triadan: 110 },
  { tooth: "I1", triadan: 401 },
  { tooth: "I2", triadan: 402 },
  { tooth: "I3", triadan: 403 },
  { tooth: "C", triadan: 404 },
  { tooth: "P1", triadan: 405 },
  { tooth: "P2", triadan: 406 },
  { tooth: "P3", triadan: 407 },
  { tooth: "P4", triadan: 408 },
  { tooth: "M1", triadan: 409 },
  { tooth: "M2", triadan: 410 },
  { tooth: "M3", triadan: 411 },
  { tooth: "I1", triadan: 201 },
  { tooth: "I2", triadan: 202 },
  { tooth: "I3", triadan: 203 },
  { tooth: "C", triadan: 204 },
  { tooth: "P1", triadan: 205 },
  { tooth: "P2", triadan: 206 },
  { tooth: "P3", triadan: 207 },
  { tooth: "P4", triadan: 208 },
  { tooth: "M1", triadan: 209 },
  { tooth: "M2", triadan: 210 },
  { tooth: "I1", triadan: 301 },
  { tooth: "I2", triadan: 302 },
  { tooth: "I3", triadan: 303 },
  { tooth: "C", triadan: 304 },
  { tooth: "P1", triadan: 305 },
  { tooth: "P2", triadan: 306 },
  { tooth: "P3", triadan: 307 },
  { tooth: "P4", triadan: 308 },
  { tooth: "M1", triadan: 309 },
  { tooth: "M2", triadan: 310 },
  { tooth: "M3", triadan: 311 },
  { tooth: " ", triadan: '' },
];

let data = []

class EntryGrid extends React.Component {
  state = { rows };
  species = "feline";

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.patient_name = React.createRef();
    this.patient_number = React.createRef();
    this.date = React.createRef();
    this.doctor = React.createRef();
    this.tech = React.createRef();
    this.complaint = React.createRef();
    this.onSpeciesChange = this.onSpeciesChange.bind(this);
  }

  handleSubmit(event) {
    this.fillPdf()
    event.preventDefault();
  }

  onSpeciesChange(event) {
    this.species = event.target.value;
    console.log(this.species);
  }


  async fillPdf() {

    // Fetch an existing PDF document
    let url = this.species + '_chart.pdf'
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const pages = pdfDoc.getPages()
    const firstPage = pages[0]

    let textSize = 9

    let firstXStart = 540
    let firstYStart = 250
    let topXSpacing = -19.8
    let topYSpacing = -11.4

    let secondXStart = 540
    let secondYStart = 125
    let bottomYSpacing = -11

    let thirdXStart = 560

    console.log(this.patient_name.current.value)

    firstPage.drawText(this.patient_name.current.value, { x: 50, y: 560, size: 20, font: helveticaFont })
    firstPage.drawText(this.patient_number.current.value, { x: 50, y: 500, size: 20, font: helveticaFont })

    firstPage.drawText(this.date.current.value, { x: 330, y: 585, size: 12, font: helveticaFont })
    firstPage.drawText(this.tech.current.value, { x: 330, y: 560, size: 12, font: helveticaFont })
    firstPage.drawText(this.complaint.current.value, { x: 330, y: 545, size: 12, font: helveticaFont })



    //tridan 101-110
    for (let i = 0; i < 10; i++) {
      if ('mobility' in data[i]) {
        firstPage.drawText(data[i].mobility, {
          x: firstXStart + topXSpacing * i,
          y: firstYStart + topYSpacing * 0,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('recession' in data[i]) {
        firstPage.drawText(data[i].recession, {
          x: firstXStart + topXSpacing * i,
          y: firstYStart + topYSpacing * 1,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('pocket' in data[i]) {
        firstPage.drawText(data[i].pocket, {
          x: firstXStart + topXSpacing * i,
          y: firstYStart + topYSpacing * 2,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('furcation' in data[i]) {
        firstPage.drawText(data[i].furcation, {
          x: firstXStart + topXSpacing * i,
          y: firstYStart + topYSpacing * 3,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('hyperplasia' in data[i]) {
        firstPage.drawText(data[i].hyperplasia, {
          x: firstXStart + topXSpacing * i,
          y: firstYStart + topYSpacing * 4,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('calculus' in data[i]) {
        firstPage.drawText(data[i].calculus, {
          x: firstXStart + topXSpacing * i,
          y: firstYStart + topYSpacing * 5,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('gingivitis' in data[i]) {
        firstPage.drawText(data[i].gingivitis, {
          x: firstXStart + topXSpacing * i,
          y: firstYStart + topYSpacing * 6,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('pdstate' in data[i]) {
        firstPage.drawText(data[i].pdstate, {
          x: firstXStart + topXSpacing * i,
          y: firstYStart + topYSpacing * 7,
          size: textSize,
          font: helveticaFont,
        })
      }
    }

    //tridan 401-411
    for (let i = 0; i < 11; i++) {
      let tooth_number = i + 10
      console.log(data[tooth_number])
      if ('mobility' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].mobility, {
          x: secondXStart + topXSpacing * i,
          y: secondYStart + bottomYSpacing * 0,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('recession' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].recession, {
          x: secondXStart + topXSpacing * i,
          y: secondYStart + bottomYSpacing * 1,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('pocket' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].pocket, {
          x: secondXStart + topXSpacing * i,
          y: secondYStart + bottomYSpacing * 2,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('furcation' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].furcation, {
          x: secondXStart + topXSpacing * i,
          y: secondYStart + bottomYSpacing * 3,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('hyperplasia' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].hyperplasia, {
          x: secondXStart + topXSpacing * i,
          y: secondYStart + bottomYSpacing * 4,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('calculus' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].calculus, {
          x: secondXStart + topXSpacing * i,
          y: secondYStart + bottomYSpacing * 5,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('gingivitis' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].gingivitis, {
          x: secondXStart + topXSpacing * i,
          y: secondYStart + bottomYSpacing * 6,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('pdstate' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].pdstate, {
          x: secondXStart + topXSpacing * i,
          y: secondYStart + bottomYSpacing * 7,
          size: textSize,
          font: helveticaFont,
        })
      }
    }

    //tridan 201-210
    for (let i = 0; i < 10; i++) {
      let tooth_number = i + 21
      if ('mobility' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].mobility, {
          x: thirdXStart - topXSpacing * i,
          y: firstYStart + topYSpacing * 0,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('recession' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].recession, {
          x: thirdXStart - topXSpacing * i,
          y: firstYStart + topYSpacing * 1,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('pocket' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].pocket, {
          x: thirdXStart - topXSpacing * i,
          y: firstYStart + topYSpacing * 2,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('furcation' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].furcation, {
          x: thirdXStart - topXSpacing * i,
          y: firstYStart + topYSpacing * 3,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('hyperplasia' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].hyperplasia, {
          x: thirdXStart - topXSpacing * i,
          y: firstYStart + topYSpacing * 4,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('calculus' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].calculus, {
          x: thirdXStart - topXSpacing * i,
          y: firstYStart + topYSpacing * 5,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('gingivitis' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].gingivitis, {
          x: thirdXStart - topXSpacing * i,
          y: firstYStart + topYSpacing * 6,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('pdstate' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].pdstate, {
          x: thirdXStart - topXSpacing * i,
          y: firstYStart + topYSpacing * 7,
          size: textSize,
          font: helveticaFont,
        })
      }
    }

    //tridan 301-311
    for (let i = 0; i < 11; i++) {
      let tooth_number = i + 31
      console.log(data[tooth_number])
      if ('mobility' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].mobility, {
          x: thirdXStart - topXSpacing * i,
          y: secondYStart + bottomYSpacing * 0,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('recession' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].recession, {
          x: thirdXStart - topXSpacing * i,
          y: secondYStart + bottomYSpacing * 1,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('pocket' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].pocket, {
          x: thirdXStart - topXSpacing * i,
          y: secondYStart + bottomYSpacing * 2,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('furcation' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].furcation, {
          x: thirdXStart - topXSpacing * i,
          y: secondYStart + bottomYSpacing * 3,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('hyperplasia' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].hyperplasia, {
          x: thirdXStart - topXSpacing * i,
          y: secondYStart + bottomYSpacing * 4,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('calculus' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].calculus, {
          x: thirdXStart - topXSpacing * i,
          y: secondYStart + bottomYSpacing * 5,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('gingivitis' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].gingivitis, {
          x: thirdXStart - topXSpacing * i,
          y: secondYStart + bottomYSpacing * 6,
          size: textSize,
          font: helveticaFont,
        })
      }
      if ('pdstate' in data[tooth_number]) {
        firstPage.drawText(data[tooth_number].pdstate, {
          x: thirdXStart - topXSpacing * i,
          y: secondYStart + bottomYSpacing * 7,
          size: textSize,
          font: helveticaFont,
        })
      }
    }

    const pdfBytes = await pdfDoc.save()
    download(pdfBytes, "chart.pdf", "application/pdf");
  };

  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      data = rows;
      return { rows };
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Patient Name:
          <input type="text" ref={this.patient_name} />
          </label>
          <label>
            Patient Number:
          <input type="text" ref={this.patient_number} />
          </label>
          <label>
            Date:
          <input type="text" ref={this.date} />
          </label>
          <label>
            Tech:
          <input type="text" ref={this.tech} />
          </label>
          <br></br>
          <label>
            Complaint:
          <textarea ref={this.complaint} />
          </label>
          <div onChange={this.onSpeciesChange}>
            <input type="radio" value="feline" name="species" defaultChecked /> Feline
            <input type="radio" value="canine" name="species" /> Canine
          </div>
          <ReactDataGrid
            columns={columns}
            rowGetter={i => this.state.rows[i]}
            rowsCount={43}
            minHeight={1000}
            onGridRowsUpdated={this.onGridRowsUpdated}
            enableCellSelect={true}
          />
          <div>
            <input type="submit" value="Generate Chart" />
          </div>
        </form>
      </div>
    );
  }
}
export default EntryGrid;
