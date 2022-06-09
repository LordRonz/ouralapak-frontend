import Link from 'next/link';
import React from 'react';

import Breadcrumbs from '@/components/Common/PageTitle';
import ThemeChanger from '@/components/Common/ThemeChanger';

const SignUpMain = () => {
  return (
    <main>
      <ThemeChanger />

      <Breadcrumbs
        breadcrumbTitle='Sign up'
        breadcrumbSubTitle='Create Account'
      />

      <section
        className='sign-up-area pt-130 pb-90'
        style={{ background: 'url(assets/img/bg/sign-up-bg.jpg)' }}
      >
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='sign-up-wrapper pos-rel wow fadeInUp mb-40'>
                <div className='sign-up-inner'>
                  <div className='sign-up-content'>
                    <h4>Create Account</h4>
                    <p className='mb-35'>
                      It{"'"}s easy to create an account for Non-fungible tokens
                      and sale your any items independently online securely in
                      the world.
                    </p>
                    <form className='sign-up-form' action='#'>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div className='single-input-unit'>
                            <label htmlFor='f-name'>First Name</label>
                            <input
                              type='text'
                              name='f-name'
                              id='f-name'
                              placeholder='Your first name'
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='single-input-unit'>
                            <label htmlFor='l-name'>Last Name</label>
                            <input
                              type='text'
                              name='l-name'
                              id='l-name'
                              placeholder='Your last name'
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='single-input-unit mb-30'>
                            <label htmlFor='g-select'>Gender</label>
                            <div className='common-select-arrow common-select-arrow-60 w-full'>
                              <select
                                name='g-select'
                                id='g-select'
                                className='gender-category-select'
                              >
                                <option value='1'>Male</option>
                                <option value='2'>Female</option>
                                <option value='3'>Other</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='single-input-unit'>
                            <label htmlFor='m-id'>Email</label>
                            <input
                              type='email'
                              name='m-id'
                              id='m-id'
                              placeholder='Your email'
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='single-input-unit'>
                            <label htmlFor='u-name'>Username</label>
                            <input
                              type='text'
                              name='u-name'
                              id='u-name'
                              placeholder='Username'
                            />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div className='single-input-unit'>
                            <label htmlFor='password'>Password</label>
                            <input
                              type='password'
                              name='password'
                              id='password'
                              placeholder='********'
                            />
                          </div>
                        </div>
                      </div>
                      <div className='sign-up-btn'>
                        <button className='fill-btn'>Create Account</button>
                        <div className='note'>
                          Already have an account?{' '}
                          <Link href='/login'>
                            <a className='text-btn'>Sign In</a>
                          </Link>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='sign-up-with-social'>
                  <div
                    className='sign-up-with-social-bg'
                    style={{
                      background: 'url(assets/img/bg/sign-up-social-bg.jpg)',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SignUpMain;
