import React, { useState } from "react";
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';

function Bill() {
  const [product1Price, setProduct1Price] = useState("");
  const [product2Price, setProduct2Price] = useState("");
  const [total, setTotal] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [gstTotal, setGstTotal] = useState(0);
  const [showGstDetails, setShowGstDetails] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  const calculateTotal = (operation) => {
    const price1 = parseFloat(product1Price);
    const price2 = parseFloat(product2Price);

    if (isNaN(price1) || isNaN(price2)) {
      alert('Please enter valid numbers for product prices.');
      return;
    }

    let result;
    switch (operation) {
      case 'add':
        result = price1 + price2;
        break;
      case 'subtract':
        result = price1 - price2;
        break;
      case 'multiply':
        result = price1 * price2;
        break;
      case 'divide':
        if (price2 === 0) {
          alert('Cannot divide by zero.');
          return;
        }
        result = price1 / price2;
        break;
      default:
        result = 0;
    }

    setTotal(result);
  };

  const addGST = () => {
    const totalWithoutGst = parseFloat(total);
    const cgstAmount = totalWithoutGst * 0.09;
    const sgstAmount = totalWithoutGst * 0.09;
    const gstAmount = cgstAmount + sgstAmount;

    setCgst(cgstAmount);
    setSgst(sgstAmount);
    setGstTotal(totalWithoutGst + gstAmount);
    setShowGstDetails(true);
  };

  const applyDiscount = () => {
    const grandDiscount = gstTotal * (parseFloat(discount) / 100);
    setFinalTotal(gstTotal - grandDiscount);
  };

  const downloadInvoice = () => {
    const pdf = new jsPDF()
    pdf.setFontSize(16);
    pdf.text('Receipt', 10, 10);
    pdf.text(`Product 1 Price: ${product1Price}`, 10, 30);
    pdf.text(`Product 2 Price: ${product2Price}`, 10, 40);
    pdf.text(`Total: ${total}`, 10, 50);
    if (showGstDetails) {
      pdf.text(`CGST: ${cgst}`, 10, 60);
      pdf.text(`SGST: ${sgst}`, 10, 70);
      pdf.text(`Total GST: ${cgst + sgst}`, 10, 80);
      pdf.text(`Total with GST: ${gstTotal}`, 10, 90);
    }
    pdf.text(`Discount: ${discount}`, 10, 100);
    pdf.text(`Final Total: ${finalTotal}`, 10, 110);

    pdf.save('receipt.pdf');
     alert("Receipt Download")

  }

  return (
    <div className="flex flex-col justify-center items-center mt-16">
      <div className="w-full max-w-2xl bg-sky-100 rounded-md px-12 pt-8 pb-10 mb-6">
        <input
          type="number"
          placeholder="Enter price for product 1"
          className="m-4 border-black p-1"
          value={product1Price}
          onChange={(e) => setProduct1Price(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter price for product 2"
          className="m-4 border-black p-1"
          value={product2Price}
          onChange={(e) => setProduct2Price(e.target.value)}
        />
        <br />
        <button className="bg-blue-900 text-white font-bold p-2 ml-4 mr-8" onClick={() => calculateTotal('add')}>Add</button>
        <button className="bg-blue-900 text-white font-bold p-2 ml-3 mr-8" onClick={() => calculateTotal('subtract')}>Subtract</button>
        <button className="bg-blue-900 text-white font-bold p-2 ml-3 mr-8" onClick={() => calculateTotal('multiply')}>Multiply</button>
        <button className="bg-blue-900 text-white font-bold p-2 ml-3 mr-8" onClick={() => calculateTotal('divide')}>Divide</button>
        <br />
        <div className="font-bold text-xl text-right">Total: {total}</div>
        <button className="bg-blue-900 text-white font-bold p-2 block m-2" onClick={addGST}>Add GST</button>
        {showGstDetails && (
          <div className="text-xl text-right">
            CGST: {cgst}
            <br />
            SGST: {sgst}
            <br />
            Total GST: {cgst + sgst}
            <br />
            Total with GST: {gstTotal}
          </div>
        )}
        <input type="number" className=" m-4 border-black p-1" placeholder="Enter Discount" value={discount} onChange={(e) => setDiscount(e.target.value)} />
        <button className="bg-blue-900 text-white font-bold p-2  mr-8" onClick={applyDiscount}>Apply Discount</button>
        <div className="font-bold text-xl text-right">Grand Total: {finalTotal}</div>
        <button className="bg-blue-900 text-white font-bold p-2 ml-3 mr-8" onClick={downloadInvoice}>Download Invoice</button>
      </div>
    </div>
  );
}

export default Bill;
