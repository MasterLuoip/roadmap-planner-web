const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'lawson',
  host: 'localhost',
  database: 'roadmap_planner',
  password: 'password',
  port: 5432,
});

const QUERY_ALL_ROADMAPS = `SELECT
roadmaps.title AS roadmap_title,
stages.title AS stage_title,
stage_sections.content AS stage_section_content,
checkpoints.content AS checkpoint_content
FROM
checkpoints
INNER JOIN stage_sections
  using(stage_section_id)
INNER JOIN stages 
  using(stage_id) 
INNER JOIN roadmaps 
  using(roadmap_id)`;

const getRoadmaps = async (request, response) => {
  const results = await queryRoadmaps();
  response.status(200).json(results);
};

const addRoadmap = async (request, response) => {
  await queryToAddRoadmap(request.body);
  console.log('sucessed');
  response.status(200).send('Sucessed');
};

async function queryRoadmaps() {
  try {
    let roadmaps = await (
      await pool.query('SELECT roadmap_id AS id, title FROM roadmaps')
    ).rows;
    for (let roadmap of roadmaps) {
      roadmap.stages = await (
        await pool.query(
          `SELECT stage_id AS id, title FROM stages WHERE roadmap_id = '${roadmap.id}'`
        )
      ).rows;
      for (let stage of roadmap.stages) {
        stage.sections = await (
          await pool.query(
            `SELECT stage_section_id AS id, content FROM stage_sections WHERE stage_id = '${stage.id}'`
          )
        ).rows;
        for (let section of stage.sections) {
          section.checkpoints = await (
            await pool.query(
              `SELECT checkpoint_id AS id, content FROM checkpoints WHERE stage_section_id = '${section.id}'`
            )
          ).rows;
        }
      }
    }
    return roadmaps;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function queryToAddRoadmap(newRoadmap) {
  await pool.query(
    `INSERT INTO roadmaps (roadmap_id, title) VALUES('${newRoadmap.id}', '${newRoadmap.title}')`
  );
}

module.exports = {
  getRoadmaps,
  addRoadmap,
};
