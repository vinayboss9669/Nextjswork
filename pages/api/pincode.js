// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ pincode: [2221412,412412,124214,141412] });
// }

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  let pincodes={
    " ": ["Kolkata", "Howrah", "Bardhaman"],
    "412412": ["Pune", "Mumbai"],
    "124214": ["Delhi", "Noida", "Gurgaon"],
    "141412": ["Jaipur", "Udaipur"],
    "214124": ["Chennai", "Coimbatore"]
  }
  res.status(200).json({ pincode: Object.keys(pincodes), location: Object.values(pincodes).flat() });
}
