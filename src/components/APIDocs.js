import React from "react";

const APIDocs = () => {
  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2 style={{ color: "gold" }}>API Documentation</h2>

      <section>
        <h3>Introduction</h3>
        <p>
          The GoldSphere API allows developers to integrate gold product
          management, portfolio tracking, and order requests into their
          applications. Use our API to retrieve data, manage user portfolios, and
          handle orders seamlessly.
        </p>
      </section>

      <section>
        <h3>Authentication</h3>
        <p>
          To access the API, include your API key in the request header:
        </p>
        <code>
          {`Authorization: Bearer <your_api_key>`}
        </code>
      </section>

      <section>
        <h3>Endpoints</h3>
        <table className="enhanced-table">
          <thead>
            <tr>
              <th>Method</th>
              <th>Endpoint</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>GET</td>
              <td>/api/products</td>
              <td>Retrieve a list of available gold products.</td>
            </tr>
            <tr>
              <td>POST</td>
              <td>/api/orders</td>
              <td>Create a new order for gold products.</td>
            </tr>
            <tr>
              <td>GET</td>
              <td>/api/portfolio</td>
              <td>Retrieve a user's portfolio details.</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h3>Example Request</h3>
        <p>Here’s an example of a request to retrieve products:</p>
        <code>
          {`curl -X GET https://api.goldsphere.com/api/products \
  -H "Authorization: Bearer <your_api_key>"`}
        </code>
      </section>

      <section>
        <h3>Resources</h3>
        <ul>
          <li>
            <a href="#" style={{ color: "gold" }}>
              API Key Management
            </a>
          </li>
          <li>
            <a href="#" style={{ color: "gold" }}>
              Detailed Endpoint Documentation
            </a>
          </li>
          <li>
            <a href="#" style={{ color: "gold" }}>
              Frequently Asked Questions
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default APIDocs;
