function calcRow(seatNo, seatsPerRow) {
  let count = 0;
  for (let i = 0; i < seatsPerRow.length; i++) {
    count += seatsPerRow[i];
    if (seatNo > count) continue;
    return i + 1;
  }
  throw new Error("seatNo is out of range");
}

module.exports = calcRow;
