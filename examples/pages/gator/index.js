import React, {useState, useEffect} from 'react';
import Head from 'next/head'
import {uniq} from 'lodash'

import {FFTable, FFCoverage, FFChart, tableFetch} from '../../../widgets/firefly'
import {hashcode} from '../../../util/utils'

import {Form, Input, Select} from '../../../widgets/form';
import {Page} from '../index';
import {useFormContext} from 'react-hook-form';

export default function App() {

    const [showForm=true, setShowForm] = useState();
    const [tblSrc, setTblSrc] = useState();

    const onSubmit = (data) => {
        const pos = encodeURIComponent(data.pos);
        const {radius=10, catalog='allwise_p3as_psd', mission='irsa'} = data;
        const url = `https://irsa.ipac.caltech.edu/cgi-bin/Gator/nph-query?objstr=${pos}&radius=${radius}&catalog=${catalog}&mission=${mission}&outfmt=1`;
        setTblSrc(url);
        setShowForm(false);
    };

    return (
        <Page>
            <Head>
                <title>IRSA Catalog</title>
                <link rel='icon' href='/gator/favicon.ico' />
                <script defer type='text/javascript' language='javascript' src='https://irsa.ipac.caltech.edu/frontpage/frontpage.nocache.js'> </script>
                <script> {`
                    fireflyToolbar = {
                        'rootComponentsURL': '/api'
                    }
                `}
                </script>
            </Head>

            <div className='container'>
                <div id='irsa-banner'   style={{minWidth:768, minHeight: 95}}/>
                <h2 style={{textAlign: 'center'}}>General Catalog Query Engine</h2>
                {showForm &&
                    <Form className='form' onSubmit={onSubmit} options={{mode:'onBlur', shouldUnregister: false}}>
                        <Position onSubmit={onSubmit}/>
                    </Form>
                }
                {tblSrc && <Results {...{tblSrc, showForm, setShowForm}}/>}
            </div>

            <style jsx> {`
                .container {
                    position: absolute;
                    top: 120px;
                    bottom: 20px;
                    left: 20px;
                    right: 20px;
                }               
            `} </style>
        </Page>
    );
}

function Position({onSubmit}) {

    const {watch} = useFormContext();
    const [catMaster, setCatMaster] = useState();

    const projects = uniq(catMaster?.tableData?.data?.map((r) => r[0])).map((value) => {return {value}});

    const project = watch("project") || projects?.[0]?.value;
    const catalogs = catMaster?.tableData?.data?.filter((r) => r[0] === project)?.map((r) => {return {value:r[4]}});

    useEffect(() => {
        tableFetch({id: 'irsaCatalogMasterTable'}).then((table) => {
            setCatMaster(table);
        });
    }, []);

    return (
        <div className='box'>
            <Input name='pos' label='Position:' required={true}/>

            <div className='examples'>
                <div> Examples:</div>
                <div>
                    <a onClick={() => onSubmit({pos: 'MESSIER 081', radius: 10, catalog: 'allwise_p3as_psd'})}>MESSIER 081 </a>
                    <a onClick={() => onSubmit({pos: '142.09185 +40.90014 ga', radius: 10, catalog: 'allwise_p3as_psd'})}> 142.09185 +40.90014 ga </a>
                    <a onClick={() => onSubmit({pos: '09h55m33.17s +69d03m55.0s', radius: 10, catalog: 'allwise_p3as_psd'})}> 09h55m33.17s +69d03m55.0s </a>
                    <a onClick={() => onSubmit({pos: '119.4903298 51.5802410 ecl', radius: 10, catalog: 'allwise_p3as_psd'})}> 119.4903298 51.5802410 ecl </a>
                </div>
            </div>

            <div className='cat'>
                <Input name='radius'  label='Radius:' title='Search radius in arcseconds'{...{min:1, max:1080, required:true}}/>
                <Select name='project' label='Project:' options={projects}/>
                <Select name='catalog' label='Catalog:' options={catalogs}/>
            </div>

            <div><input style={{marginTop: 20}} type='submit'/></div>

            <style jsx> {`
                .box {
                    border: 1px solid #bfbfbf;
                    background-color: #e3e3e3;
                    border-radius: 6px;
                    padding: 20px;
                    margin-bottom: 20px;
                }
                div :global(.form-label) {
                    width: 75px;
                    font-weight: bold;
                }
                div :global(.form-input) {
                    width: 200px;
                }
                div.cat :global(.form-label) {
                    width: 50px;
                    margin: 15px 0 0px 30px;
                    display: inline-block;                    
                }
                div.cat :global(.form-input) {
                    margin-left: 30px;
                    width: 185px;                    
                }
                .examples {
                    margin: 0 0 20px;
                    font-style: italic;
                    color: gray;
                }
                .examples a {
                    text-decoration: none;   
                    font-size: small;
                    color: blue;             
                }
                .examples a:hover {
                    cursor: pointer; 
                    color: green;             
                }
                .examples a ::after {
                    content: ']   ';
                }
                .examples a ::before {
                    content: '   [';
                }
            `} </style>

        </div>
    );
}

function Results({tblSrc, showForm, setShowForm, target}) {
    const tbl_id = 'gator-' + hashcode(tblSrc);

    return (
        <div className='box'>
            {!showForm && <button style={{margin: '10px 0'}} onClick={() => setShowForm(true)}> Show Search Form</button>}
            <div className='top'>
                <FFCoverage style={{marginRight: 5}}> coverage here </FFCoverage>
                <FFChart tbl_id={tbl_id}> chart here </FFChart>
            </div>
            <div className='bottom'>
                <FFTable style={{height: 'unset', flexGrow: .5}}
                         tbl_id={tbl_id} src={tblSrc} title='Search Results'
                         onHighlight={(a) => console.log(a)}
                         onSelect={(a) => console.log(a)}
                         onSort={(a) => console.log(a)}
                         onFilter={(a) => console.log(a)}
                />
            </div>

            <style jsx> {`
                .box {
                    height: 100%;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                }
                .top {
                    flex-grow: .5;
                    display: inline-flex;
                    margin-bottom: 5px;                
                }
                .bottom {
                    flex-grow: .5;
                    display: inline-flex;
                }
            `} </style>

        </div>
    );

}