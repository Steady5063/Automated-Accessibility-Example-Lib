import React from "react";
//Example for Component testing, Listing Styling, htmlFor for the label;
const InaccessibleComp = () => (
  <footer role="footer">
        <div className="col-6">
                        <ul className="list-unstyled" data-testid="footList">
                            <hr/>
                            <li><a href="">Sabers</a></li>
                            <li><a href="">Blades</a></li>
                            <li><a href="">Kyber Crystals</a></li>
                            <li><a href="">Colors</a></li>
                        </ul>
                    </div>

                    <div className="col-6" >
                        <ul className="list-unstyled">
                            <hr/>
                            <li><a href="">Documentation</a></li>
                            <li><a href="">Support</a></li>
                            <li><a href="">Legal Terms</a></li>
                            <li><a href="">About</a></li>
                        </ul>
                    </div>
        
            <div className="col-5">
                <h5 role="heading">Contact Us</h5>
                <form>
                        <label >Email:</label>
                        <input type="email" className="form-control" id="exampleEmail"/>
                        <label >Message:</label>
                        <textarea className="form-control" id="exampleMessage"></textarea>
                </form>
        
              </div>

  </footer>
);
export default InaccessibleComp;
