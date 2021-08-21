CREATE TABLE roadmaps(
  roadmap_id UUID NOT NULL PRIMARY KEY,
  title VARCHAR(200) NOT NULL
);

CREATE TABLE stages(
  stage_id UUID NOT NULL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  roadmap_id UUID NOT NULL,
  FOREIGN KEY (roadmap_id) REFERENCES roadmaps(roadmap_id)
);

CREATE TABLE stage_sections(
  stage_section_id UUID NOT NULL PRIMARY KEY,
  content VARCHAR(2000),
  stage_id UUID NOT NULL,
  FOREIGN KEY (stage_id) REFERENCES stages(stage_id)
);

CREATE TABLE checkpoints(
  checkpoint_id UUID NOT NULL PRIMARY KEY,
  content VARCHAR(200) NOT NULL,
  stage_section_id UUID NOT NULL,
  FOREIGN KEY (stage_section_id) REFERENCES stage_sections(stage_section_id)
);

--  add roadmap maps to post
INSERT INTO roadmaps (roadmap_id, title) VALUES(uuid_generate_v4(), 'roadmap1');
INSERT INTO roadmaps (roadmap_id, title) VALUES(uuid_generate_v4(), 'roadmap2');
-- delete roadmap maps to DELETE
DELETE FROM roadmaps WHERE id = ${target_id}
-- update roadmap
ALTER TABLE roadmap SET title = ${new_title} WHERE id = ${target_id};

-- add stages
insert into stages (stage_id, title, roadmap_id) VALUES(uuid_generate_v4(), 'stage1', '1');
insert into stages (stage_id, title, roadmap_id) VALUES(uuid_generate_v4(), 'stage1', '2');

-- add stage section
insert into stage_sections (stage_section_id, content, stage_id) VALUES(uuid_generate_v4(), 'stage section1', '1');
insert into stage_sections (stage_section_id, content, stage_id) VALUES(uuid_generate_v4(), 'stage section2', '1');

-- add checkpoints
insert into checkpoints (checkpoint_id, content, stage_section_id) VALUES(uuid_generate_v4(), 'new content', '1');

-- join tables
-- roadmaps.title AS roadmap_title,
-- 	stages.title AS stage_title,
-- 	stage_sections.title AS stage_section_title,
-- 	checkpoints.title AS checkpoint_title
SELECT
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
    using(roadmap_id);

-- single table
CREATE TABLE roadmaps_new(
  roadmap_id UUID NOT NULL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  value jsonb
);
