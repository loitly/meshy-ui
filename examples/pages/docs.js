import {Page} from './index';
import Link from 'next/link'


export default function App() {

    return (
        <Page>
            <GettingStarted/>

            <style jsx> {`
                :global(code) {
                    display: block;
                    padding: 1em;
                    background-color: #ececec;
                    margin: 1em 0;
                    white-space: pre;
                    border-radius: 4px;
                }
            `} </style>
        </Page>
    );
}

function GettingStarted() {
    return (
        <div>
            <h3>Getting Started</h3>
            <em>Meshy-UI</em> is a github template.  You can either create a fork of the repository or create your own repository from this template.
            <br/>
            Or, if you only wish to experiment with <em>Meshy-UI</em>, you can clone <em>Meshy-UI</em> directly without creating your own repository.

            <code>
                git clone https://github.com/loitly/meshy-ui
            </code>

            <em>Meshy-UI</em> comes with examples.  To create the examples application, run
            <code>{
`cd meshy-ui
yarn examples
yarn dev`
            }</code>

            The above commands build and deploy the examples application running on your local machine with hot reloading.  This means it will monitor source
            files for changes and will automatically build and update the deployment with those changes.
            <br/>
            Goto <a href='http://localhost:3000' target='_blank'>http://localhost:3000</a> to see the application in your default browser.

            <h4><Link href='/gator'><a>Gator</a></Link></h4>


            <br/><br/>
            To remove the examples application, run
            <code>
                yarn examples clean
            </code>

        </div>
    );
}
