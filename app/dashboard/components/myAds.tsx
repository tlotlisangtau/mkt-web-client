import React from 'react'

function MyAds() {
  return (
<section className="tg-dbsectionspace tg-haslayout">
				<div className="row">
					<form className="tg-formtheme tg-formdashboard">
						<fieldset>
							<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
								<div className="tg-dashboardbox">
									<div className="tg-dashboardboxtitle">
										<h2>My Ads</h2>
									</div>
									<div className="tg-dashboardholder">
										<nav className="tg-navtabledata">
											<ul>
												<li className="tg-active"><a href="*">All Ads (50)</a></li>
												<li><a href="*">Featured (12)</a></li>
												<li><a href="javascript:void(0);" data-category="active">Active (42)</a></li>
												<li><a href="javascript:void(0);" data-category="inactive">Inactive (03)</a></li>
												<li><a href="javascript:void(0);" data-category="sold">Sold (02)</a></li>
												<li><a href="javascript:void(0);" data-category="expired">Expired (01)</a></li>
												<li><a href="javascript:void(0);" data-category="deleted">Deleted (03)</a></li>
											</ul>
										</nav>
										<div className="tg-otherfilters">
											<div className="row">
												<div className="col-xs-12 col-sm-6 col-md-5 col-lg-4 pull-left">
													<div className="form-group tg-sortby">
														<span>Sort by:</span>
														<div className="tg-select">
															<select>
																<option>Most Recent</option>
																<option>Most Recent</option>
																<option>Most Recent</option>
															</select>
														</div>
													</div>
												</div>
												<div className="col-xs-12 col-sm-5 col-md-5 col-lg-4 pull-right">
													<div className="form-group tg-inputwithicon">
														<i className="icon-magnifier"></i>
														<input type="search" name="search" className="form-control" placeholder="Search Here"/>
													</div>
												</div>
											</div>
										</div>
										<table id="tg-adstype" className="table tg-dashboardtable tg-tablemyads">
											<thead>
												<tr>
													<th>
														<span className="tg-checkbox">
															<input id="tg-checkedall" type="checkbox" name="myads" value="checkall"/>
															<label htmlFor="tg-checkedall"></label>
														</span>
													</th>
													<th>Photo</th>
													<th>Title</th>
													<th>Category</th>
													<th>Featured</th>
													<th>Ad Status</th>
													<th>Price &amp; Location</th>
													<th>Date</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												<tr data-category="active">
													<td data-title="">
														<span className="tg-checkbox">
															<input id="tg-adone" type="checkbox" name="myads" value="myadone"/>
															<label htmlFor="tg-adone"></label>
														</span>
													</td>
													<td data-title="Photo"><img src="images/thumbnail/img-06.jpg" alt="image description"/></td>
													<td data-title="Title">
														<h3>A+ HP probook 6560b core i3 2nd generation</h3>
														<span>Ad ID: ng3D5hAMHPajQrM</span>
													</td>
													<td data-title="Category"><span className="tg-adcategories">Laptops &amp; PCs</span></td>
													<td data-title="Featured">Yes</td>
													<td data-title="Ad Status"><span className="tg-adstatus tg-adstatusactive">active</span></td>
													<td data-title="Price &amp; Location">
														<h3>$200</h3>
														<address>location  44-46 Morningside North Road Edinburgh, Scotland, EH10 4BF</address>
													</td>
													<td data-title="Date">
														<time dateTime="2017-08-08">Jun 27, 2017</time>
														<span>Published</span>
													</td>
													<td data-title="Action">
														<div className="tg-btnsactions">
															<a className="tg-btnaction tg-btnactionview" href="javascript:void(0);"><i className="fa fa-eye"></i></a>
															<a className="tg-btnaction tg-btnactionedit" href="javascript:void(0);"><i className="fa fa-pencil"></i></a>
															<a className="tg-btnaction tg-btnactiondelete" href="javascript:void(0);"><i className="fa fa-trash"></i></a>
														</div>
													</td>
												</tr>
												<tr data-category="active">
													<td data-title="">
														<span className="tg-checkbox">
															<input id="tg-adtwo" type="checkbox" name="myads" value="myadtwo"/>
															<label htmlFor="tg-adtwo"></label>
														</span>
													</td>
													<td data-title="Photo"><img src="images/thumbnail/img-07.jpg" alt="image description"/></td>
													<td data-title="Title">
														<h3>A+ HP probook 6560b core i3 2nd generation</h3>
														<span>Ad ID: ng3D5hAMHPajQrM</span>
													</td>
													<td data-title="Category">Laptops &amp; PCs</td>
													<td data-title="Featured">Yes</td>
													<td data-title="Ad Status"><span className="tg-adstatus tg-adstatusactive">active</span></td>
													<td data-title="Price &amp; Location">
														<h3>$200</h3>
														<address>location  44-46 Morningside North Road Edinburgh, Scotland, EH10 4BF</address>
													</td>
													<td data-title="Date">
														<time dateTime="2017-08-08">Jun 27, 2017</time>
														<span>Published</span>
													</td>
													<td data-title="Action">
														<div className="tg-btnsactions">
															<a className="tg-btnaction tg-btnactionview" href="javascript:void(0);"><i className="fa fa-eye"></i></a>
															<a className="tg-btnaction tg-btnactionedit" href="javascript:void(0);"><i className="fa fa-pencil"></i></a>
															<a className="tg-btnaction tg-btnactiondelete" href="javascript:void(0);"><i className="fa fa-trash"></i></a>
														</div>
													</td>
												</tr>
												<tr data-category="inactive">
													<td data-title="">
														<span className="tg-checkbox">
															<input id="tg-adthree" type="checkbox" name="myads" value="myadthree"/>
															<label htmlFor="tg-adthree"></label>
														</span>
													</td>
													<td data-title="Photo"><img src="images/thumbnail/img-08.jpg" alt="image description"/></td>
													<td data-title="Title">
														<h3>A+ HP probook 6560b core i3 2nd generation</h3>
														<span>Ad ID: ng3D5hAMHPajQrM</span>
													</td>
													<td data-title="Category">Laptops &amp; PCs</td>
													<td data-title="Featured">Yes</td>
													<td data-title="">
														<span className="tg-adstatus tg-adstatusinactive">Inactive</span>
														<em>Under Review</em>
													</td>
													<td data-title="Price &amp; Location">
														<h3>$200</h3>
														<address>location  44-46 Morningside North Road Edinburgh, Scotland, EH10 4BF</address>
													</td>
													<td data-title="Date">
														<time dateTime="2017-08-08">Jun 27, 2017</time>
														<span>Published</span>
													</td>
													<td data-title="Action">
														<div className="tg-btnsactions">
															<a className="tg-btnaction tg-btnactionview" href="javascript:void(0);"><i className="fa fa-eye"></i></a>
															<a className="tg-btnaction tg-btnactionedit" href="javascript:void(0);"><i className="fa fa-pencil"></i></a>
															<a className="tg-btnaction tg-btnactiondelete" href="javascript:void(0);"><i className="fa fa-trash"></i></a>
														</div>
													</td>
												</tr>
												<tr data-category="sold">
													<td data-title="">
														<span className="tg-checkbox">
															<input id="tg-adfour" type="checkbox" name="myads" value="myadfour"/>
															<label htmlFor="tg-adfour"></label>
														</span>
													</td>
													<td data-title="Photo"><img src="images/thumbnail/img-09.jpg" alt="image description"/></td>
													<td data-title="Title">
														<h3>A+ HP probook 6560b core i3 2nd generation</h3>
														<span>Ad ID: ng3D5hAMHPajQrM</span>
													</td>
													<td data-title="Category">Laptops &amp; PCs</td>
													<td data-title="Featured">Yes</td>
													<td data-title="Ad Status"><span className="tg-adstatus tg-adstatussold">sold</span></td>
													<td data-title="Price &amp; Location">
														<h3>$200</h3>
														<address>location  44-46 Morningside North Road Edinburgh, Scotland, EH10 4BF</address>
													</td>
													<td data-title="Date">
                                                    <time dateTime="2017-08-08">Jun 27, 2017</time>
														<span>Published</span>
													</td>
													<td data-title="Action">
														<div className="tg-btnsactions">
															<a className="tg-btnaction tg-btnactionview" href="javascript:void(0);"><i className="fa fa-eye"></i></a>
															<a className="tg-btnaction tg-btnactiondelete" href="javascript:void(0);"><i className="fa fa-trash"></i></a>
														</div>
													</td>
												</tr>
												<tr data-category="active">
													<td data-title="">
														<span className="tg-checkbox">
															<input id="tg-adfive" type="checkbox" name="myads" value="myadfive"/>
															<label htmlFor="tg-adfive"></label>
														</span>
													</td>
													<td data-title="Photo"><img src="images/thumbnail/img-10.jpg" alt="image description"/></td>
													<td data-title="Title">
														<h3>A+ HP probook 6560b core i3 2nd generation</h3>
														<span>Ad ID: ng3D5hAMHPajQrM</span>
													</td>
													<td data-title="Category">Laptops &amp; PCs</td>
													<td data-title="Featured">Yes</td>
													<td data-title="Ad Status"><span className="tg-adstatus tg-adstatusactive">active</span></td>
													<td data-title="Price &amp; Location">
														<h3>$200</h3>
														<address>location  44-46 Morningside North Road Edinburgh, Scotland, EH10 4BF</address>
													</td>
													<td data-title="Date">
														<time dateTime="2017-08-08">Jun 27, 2017</time>
														<span>Published</span>
													</td>
													<td data-title="Action">
														<div className="tg-btnsactions">
															<a className="tg-btnaction tg-btnactionview" href="javascript:void(0);"><i className="fa fa-eye"></i></a>
															<a className="tg-btnaction tg-btnactionedit" href="javascript:void(0);"><i className="fa fa-pencil"></i></a>
															<a className="tg-btnaction tg-btnactiondelete" href="javascript:void(0);"><i className="fa fa-trash"></i></a>
														</div>
													</td>
												</tr>
												<tr data-category="sold">
													<td data-title="">
														<span className="tg-checkbox">
															<input id="tg-adsix" type="checkbox" name="myads" value="myadsix"/>
															<label htmlFor="tg-adsix"></label>
														</span>
													</td>
													<td data-title="Photo"><img src="images/thumbnail/img-11.jpg" alt="image description"/></td>
													<td data-title="Title">
														<h3>A+ HP probook 6560b core i3 2nd generation</h3>
														<span>Ad ID: ng3D5hAMHPajQrM</span>
													</td>
													<td data-title="Category">Laptops &amp; PCs</td>
													<td data-title="Featured">Yes</td>
													<td data-title="Ad Status"><span className="tg-adstatus tg-adstatussold">sold</span></td>
													<td data-title="Price &amp; Location">
														<h3>$200</h3>
														<address>location  44-46 Morningside North Road Edinburgh, Scotland, EH10 4BF</address>
													</td>
													<td data-title="Date">
														<time dateTime="2017-08-08">Jun 27, 2017</time>
														<span>Published</span>
													</td>
													<td data-title="Action">
														<div className="tg-btnsactions">
															<a className="tg-btnaction tg-btnactionview" href="javascript:void(0);"><i className="fa fa-eye"></i></a>
															<a className="tg-btnaction tg-btnactiondelete" href="javascript:void(0);"><i className="fa fa-trash"></i></a>
														</div>
													</td>
												</tr>
												<tr data-category="expired">
													<td data-title="">
														<span className="tg-checkbox">
															<input id="tg-adseven" type="checkbox" name="myads" value="myadseven"/>
															<label htmlFor="tg-adseven"></label>
														</span>
													</td>
													<td data-title="Photo"><img src="images/thumbnail/img-12.jpg" alt="image description"/></td>
													<td data-title="Title">
														<h3>A+ HP probook 6560b core i3 2nd generation</h3>
														<span>Ad ID: ng3D5hAMHPajQrM</span>
													</td>
													<td data-title="Category">Laptops &amp; PCs</td>
													<td data-title="Featured">Yes</td>
													<td data-title="Ad Status"><span className="tg-adstatus tg-adstatusexpired">expired</span></td>
													<td data-title="Price &amp; Location">
														<h3>$200</h3>
														<address>location  44-46 Morningside North Road Edinburgh, Scotland, EH10 4BF</address>
													</td>
													<td data-title="Date">
														<time dateTime="2017-08-08">Jun 27, 2017</time>
														<span>Published</span>
													</td>
													<td data-title="Action">
														<div className="tg-btnsactions">
															<a className="tg-btnaction tg-btnactionview" href="javascript:void(0);"><i className="fa fa-eye"></i></a>
															<a className="tg-btnaction tg-btnactionedit" href="javascript:void(0);"><i className="fa fa-pencil"></i></a>
															<a className="tg-btnaction tg-btnactiondelete" href="javascript:void(0);"><i className="fa fa-trash"></i></a>
														</div>
													</td>
												</tr>
												<tr data-category="inactive">
													<td data-title="">
														<span className="tg-checkbox">
															<input id="tg-adeight" type="checkbox" name="myads" value="myadeight"/>
															<label htmlFor="tg-adeight"></label>
														</span>
													</td>
													<td data-title="Photo"><img src="images/thumbnail/img-13.jpg" alt="image description"/></td>
													<td data-title="Title">
														<h3>A+ HP probook 6560b core i3 2nd generation</h3>
														<span>Ad ID: ng3D5hAMHPajQrM</span>
													</td>
													<td data-title="Category">Laptops &amp; PCs</td>
													<td data-title="Featured">Yes</td>
													<td data-title="">
														<span className="tg-adstatus tg-adstatusinactive">Inactive</span>
														<em>Under Review</em>
													</td>
													<td data-title="Price &amp; Location">
														<h3>$200</h3>
														<address>location  44-46 Morningside North Road Edinburgh, Scotland, EH10 4BF</address>
													</td>
													<td data-title="Date">
														<time dateTime="2017-08-08">Jun 27, 2017</time>
														<span>Published</span>
													</td>
													<td data-title="Action">
														<div className="tg-btnsactions">
															<a className="tg-btnaction tg-btnactionview" href="javascript:void(0);"><i className="fa fa-eye"></i></a>
															<a className="tg-btnaction tg-btnactionedit" href="javascript:void(0);"><i className="fa fa-pencil"></i></a>
															<a className="tg-btnaction tg-btnactiondelete" href="javascript:void(0);"><i className="fa fa-trash"></i></a>
														</div>
													</td>
												</tr>
												<tr data-category="expired">
													<td data-title="">
														<span className="tg-checkbox">
															<input id="tg-adnine" type="checkbox" name="myads" value="myadnine"/>
															<label htmlFor="tg-adnine"></label>
														</span>
													</td>
													<td data-title="Photo"><img src="images/thumbnail/img-14.jpg" alt="image description"/></td>
													<td data-title="Title">
														<h3>A+ HP probook 6560b core i3 2nd generation</h3>
														<span>Ad ID: ng3D5hAMHPajQrM</span>
													</td>
													<td data-title="Category">Laptops &amp; PCs</td>
													<td data-title="Featured">Yes</td>
													<td data-title="Ad Status"><span className="tg-adstatus tg-adstatusexpired">expired</span></td>
													<td data-title="Price &amp; Location">
														<h3>$200</h3>
														<address>location  44-46 Morningside North Road Edinburgh, Scotland, EH10 4BF</address>
													</td>
													<td data-title="Date">
														<time dateTime="2017-08-08">Jun 27, 2017</time>
														<span>Published</span>
													</td>
													<td data-title="Action">
														<div className="tg-btnsactions">
															<a className="tg-btnaction tg-btnactionview" href="javascript:void(0);"><i className="fa fa-eye"></i></a>
															<a className="tg-btnaction tg-btnactionedit" href="javascript:void(0);"><i className="fa fa-pencil"></i></a>
															<a className="tg-btnaction tg-btnactiondelete" href="javascript:void(0);"><i className="fa fa-trash"></i></a>
														</div>
													</td>
												</tr>
												<tr data-category="deleted">
													<td data-title="">
														<span className="tg-checkbox">
															<input id="tg-adten" type="checkbox" name="myads" value="myadten"/>
															<label htmlFor="tg-adten"></label>
														</span>
													</td>
													<td data-title="Photo"><img src="images/thumbnail/img-15.jpg" alt="image description" /></td>
													<td data-title="Title">
														<h3>A+ HP probook 6560b core i3 2nd generation</h3>
														<span>Ad ID: ng3D5hAMHPajQrM</span>
													</td>
													<td data-title="Category">Laptops &amp; PCs</td>
													<td data-title="Featured">Yes</td>
													<td data-title="Ad Status"><span className="tg-adstatus tg-adstatusdeleted">deleted</span></td>
													<td data-title="Price &amp; Location">
														<h3>$200</h3>
														<address>location  44-46 Morningside North Road Edinburgh, Scotland, EH10 4BF</address>
													</td>
													<td data-title="Date">
														<time dateTime="2017-08-08">Jun 27, 2017</time>
														<span>Published</span>
													</td>
													<td data-title="Action">
														<div className="tg-btnsactions">
															<a className="tg-btnaction tg-btnactionview" href="javascript:void(0);"><i className="fa fa-eye"></i></a>
															<a className="tg-btnaction tg-btnactionedit" href="javascript:void(0);"><i className="fa fa-pencil"></i></a>
															<a className="tg-btnaction tg-btnactiondelete" href="javascript:void(0);"><i className="fa fa-trash"></i></a>
														</div>
													</td>
												</tr>
											</tbody>
										</table>
										<nav className="tg-pagination">
											<ul>
												<li className="tg-prevpage"><a href="#"><i className="fa fa-angle-left"></i></a></li>
												<li><a href="#">1</a></li>
												<li><a href="#">2</a></li>
												<li><a href="#">3</a></li>
												<li><a href="#">4</a></li>
												<li className="tg-active"><a href="#">5</a></li>
												<li>...</li>
												<li><a href="#">10</a></li>
												<li className="tg-nextpage"><a href="#"><i className="fa fa-angle-right"></i></a></li>
											</ul>
										</nav>
									</div>
								</div>
							</div>
						</fieldset>
					</form>
				</div>
			</section>
  )
}

export default MyAds;
