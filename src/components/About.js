import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/auth';

/** takes in state if setting props **/
function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
class About extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
            <div className="col-md-8">
                <h1>About</h1>
                <hr />
		<h2>Objective</h2>
		<p>Team N3M is proposing a web-based application called “Party Planner” to assist user members
		with organizing social gatherings. We envision an application that provides instant messaging/chat
		functionality for a group of users to finalize and communicate the details of a future social
		event (a Party).</p>
		<p>In addition, we will providing connectivity to Uber to enable transportation of the Party members
		to a venue.</p>
		<p>To enhance the user experience, we will be building a tracking mechanism to associate a user with
		his or her social network and provide that list every time the user is creating a new Party. </p>
		<h2>Target Audience</h2>
		<p>Our target user is anyone who wants to organize real-world events and has access to the web.
		This can be a group of friends going out for the night, family members meeting for a Sunday brunch
		or even a wedding invitation.</p>
		<p>For now we will be producing an application accessible through a website and in a future release we
		will building a mobile app version to better capture our users.</p>
		<p>We expect that this application will be used mostly in an informal, on-the-fly, setting where someone
		decides to meet with friends and, using this application, organizes them to a certain time and place.
		However, we intend to provide an enhanced invitation presentation to allow for more formal events.</p>
		<p>The Uber functionality will of course be restricted to areas where Uber is available but that already
		covers most major cities around the world.</p>
		<h2>Roles</h2>
		<p>Any user can initiate a Party and invite or remove others from the Party List. As such, this user will
		have the role of the “Organizer” and be able to cancel the Party if needed. However, given the uncertainty
		of informal social gatherings, we will allow for the transfer of this role to another user if the original
		Organizer cannot be part of the Party anymore.</p>
		<p>The rest of the Party List members, the Participants will have the ability to chat with the Party and
		arrange for Uber pickup.</p>
            </div>
        );
  }
}

export default About;
