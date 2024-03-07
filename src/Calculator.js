import React, { useState } from "react";

function Calculator() {
  const [product1Price, setProduct1Price] = useState("");
  const [product2Price, setProduct2Price] = useState("");
  const [total, setTotal] = useState(0);
  const [cgst, setCgst] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [gstTotal, setGstTotal] = useState(0);
  const [showGstDetails, setShowGstDetails] = useState(false);

  const handleAdd = () => {
    const sum = parseFloat(product1Price) + parseFloat(product2Price);
    setTotal(sum);
  };

  const handleSubtract = () => {
    const difference = parseFloat(product1Price) - parseFloat(product2Price);
    setTotal(difference);
  };

  const handleMultiply = () => {
    const product = parseFloat(product1Price) * parseFloat(product2Price);
    setTotal(product);
  };

  const handleDivide = () => {
    const quotient = parseFloat(product1Price) / parseFloat(product2Price);
    setTotal(quotient);
  };

  const handleAddGST = () => {
    const totalWithoutGst = parseFloat(total);
    const cgstAmount = totalWithoutGst * 0.09;
    const sgstAmount = totalWithoutGst * 0.09;
    const gstAmount = cgstAmount + sgstAmount;

    setCgst(cgstAmount);
    setSgst(sgstAmount);
    setGstTotal(totalWithoutGst + gstAmount);
    setShowGstDetails(true);
  };

  return (

    <div className="flex flex-col justify-center items-center mt-32">
      <div className="w-full max-w-2xl">
       {/* <form className="bg-sky-100 rounded-md px-12 pt-10 pb-10 mb-6"> */}
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
          <button className="bg-blue-900 text-white font-bold p-2  m-2" onClick={handleAdd}>Add</button>
          <button className="bg-blue-900 text-white font-bold p-2  m-2" onClick={handleSubtract}>Subtract</button>
          <button className="bg-blue-900 text-white font-bold p-2  m-2" onClick={handleMultiply}>Multiply</button>
          <button className="bg-blue-900 text-white font-bold p-2  m-2" onClick={handleDivide}>Divide</button>
          <br />
          <div>Total: {total}</div>
          <button onClick={handleAddGST}>Add GST</button>
          {showGstDetails && (
            <div>
              CGST: {cgst}
              <br />
              SGST: {sgst}
              <br />
              Total GST: {cgst + sgst}
              <br />
              Total with GST: {gstTotal}
            </div>
          )}
        {/* </form> */}
      </div>
    </div>
  );
}

export default Calculator;
